const express = require('express');
const router = express.Router();

const { getAllParking, getParkingByID, createParking, updateParking, deleteParking } = require('../controllers/parking');


router.get('/', getAllParking)
router.get('/:id', getParkingByID)
router.post('/', createParking)
router.put('/:id', updateParking)
router.delete('/:id', deleteParking)

module.exports = router;