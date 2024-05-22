const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Account extends Model {}

Account.init (
    {
        account_number: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
        account_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        client_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'client', key: 'client_number' } 
        },
        account_balance: {}
    }
)