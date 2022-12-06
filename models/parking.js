module.exports = (sequelize, DataTypes) => {
  const Parking = sequelize.define('Parking', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    checkin: {
      type: DataTypes.DATE,
      allowNull: false
    },
    checkout: {
      type: DataTypes.DATE,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "unpaid"
    }
  });

  Parking.sync()

  return Parking;
}