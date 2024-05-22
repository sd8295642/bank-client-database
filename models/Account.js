const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Account extends Model {}

Account.init (
    {   
        client_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'client', key: 'client_number' } 
        },
        account_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
          },
        // checking, savings, CD, IRA, loan
        account_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // single party, joint, or multiple party for personal accounts, not needed for business accounts
        ownership_type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // only for personal and single owner business accounts (Doing Business As/DBA)
        has_beneficiary: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        // only for LLCs and Corporations, anyone who owns more than 25% of the entity
        beneficial_owners: {
            type: DataTypes.STRING,
            allowNull: true
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