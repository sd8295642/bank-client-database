const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Client extends Model {}

Client.init(
    {
        client_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        first_name: {},
        last_name: {},
        ssn: {},
        phone: {},
        email: {},
        address: {}
    }
)