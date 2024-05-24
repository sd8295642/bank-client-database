const sequelize = require('..config/connection');
const { User, Client, Account } = require('../models');

const userData = require('./userData.json');
const clientData = require('./clientData.json');
const accountData = require('./accountData.json');

const seedDatabase = async () => {
    await sequelize.sync({force: true});


}