const Client = require('./Client.js');
const Account = require('./Account.js');

Client.hasMany(Account, {
    foreignKey: 'client_id',
    onDelete: 'CASCADE'
});

Account.belongsTo(Client, {
    foreignKey: 'client_id'
});

module.exports = { Client, Account };