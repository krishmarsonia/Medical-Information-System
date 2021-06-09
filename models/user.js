const { UUIDV4 } = require('sequelize');
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const user = sequelize.define('user', {
    id: {
        type: Sequelize.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    admin:{
        type: Sequelize.STRING,
        allowNull: true
    }
});
module.exports = user;