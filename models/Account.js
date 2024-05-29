const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Account extends Model {}

Account.init (
    {   
        client_number: {
            type: DataTypes.STRING,
            allowNull: false,
            references: { model: 'client', key: 'client_number' } 
        },
        account_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
        // checking, savings, CD, IRA, loan
        account_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // single party, joint, or multiple party for personal accounts
        ownership_type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        has_beneficiary: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        account_balance: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'account',
    }
);

module.exports = Account;