const Sequelize = require("sequelize");
const { UUIDV4 } = require('sequelize');

const sequelize = require("../util/database");

const user = require("./user");

const medicine = sequelize.define("medicine", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  manufacturer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sc: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  uses: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  userId: {
    type: Sequelize.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
});

user.hasMany(medicine, {
  foreignKey: "userId",
});

module.exports = medicine;
