const Client = require('./models/Client.js');
const Account = require('./models/Account.js');

Client.hasMany(Account, {
    foreignKey: 'client_number',
    onDelete: 'CASCADE'
});

Account.belongsTo(Client, {
    foreignKey: 'client_number'
});

module.exports = { Client, Account };