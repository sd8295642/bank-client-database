const Client = require("./Client");
const Account = require("./Account");

Client.hasMany(Account, {
  foreignKey: "client_number",
  onDelete: "CASCADE",
});

Account.belongsTo(Client, {
  foreignKey: "client_number",
});

module.exports = { Client, Account };
