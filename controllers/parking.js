const { Parking } = require('../models');
const { dateComparison } = require('../utils/functions');

module.exports = {
  getAllParking: async (req, res) => {
    try {
      const parking = await Parking.findAll();
      return res.send(parking);
    } catch (error) {
      console.log("Error getAllParking:", error)
      res.status(500).send({
        status: false,
        message: "internal server error!",
        error
      })
    }
  },

  getParkingByID: async (req, res) => {
    try {
      const id = req.params.id;
      const parking = await Parking.findByPk(id);
      return res.json(parking);
    } catch (error) {
      console.log("Error getParkingByID:", error)
    }
  },

  createParking: async (req, res) => {
    try {
      const { type, checkin, checkout } = req.body
      if (!["mobil", "motor"].includes(type)) {
        return res.status(400).send({
          status: false,
          message: "invalid vehicle type!",
        });
      }
      const invalidDate = isNaN(new Date(checkin)) || isNaN(new Date(checkout))
      console.log("invalidDate", invalidDate)
      if (invalidDate || new Date(checkin) > new Date(checkout)) {
        return res.status(400).send({
          status: false,
          message: "invalid date!",
        });
      }

      let markup = 0;
      let markupPerDay = 0;

      switch (type) {
        case "mobil":
          markup = 5_000
          markupPerDay = 80_000
          break;
        case "motor":
          markup = 2_000
          markupPerDay = 40_000
          break;
      }

      const parkingTimeParse = dateComparison(checkin, checkout)

      const pricePerYear = parkingTimeParse.year * (markupPerDay*365)
      const pricePerMonth = parkingTimeParse.month * (markupPerDay*30)
      const pricePerDay = parkingTimeParse.date * markupPerDay
      const pricePerHour = parkingTimeParse.hour * markup
      let totalPrice = pricePerYear + pricePerMonth + pricePerDay + pricePerHour
      if (parkingTimeParse.minute >= 1) {
        totalPrice += markup
      }

      const createParkingData = { type, checkin, checkout, price: totalPrice }
      await Parking.create(createParkingData);
      res.send({
        status: true,
        message: "success create parking data",
        data: createParkingData
      });
    } catch (error) {
      console.log("Error createParking:", error)
      res.status(500).send({
        status: false,
        message: "internal server error!",
        error
      })
    }
  },

  updateParking: async (req, res) => {
    // TODO update parking data
    try {
      res.send({id: req.params.id, body: req.body})
    } catch (error) {
      console.log("Error updateParking:", error)
      res.status(500).send({
        status: false,
        message: "internal server error!",
        error
      })
    }
  },

  deleteParking: async (req, res) => {
    // TODO delete parking data
    try {
      const id = req.params.id
      const parking = await Parking.findByPk(id);

      if (!parking) {
        return res.send({ message: 'Parking not found' });
      }

      await parking.destroy();

      res.send({ message: "Parking is deleted" })
    } catch (error) {
      console.log("Error deleteParking:", error)
      res.status(500).send({
        status: false,
        message: "internal server error!",
        error
      })
    }
  }
}