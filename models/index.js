const Client = require("./Client");
const Account = require("./Account");
const User = require("./User")

Client.hasMany(Account, {
  foreignKey: "client_number",
  onDelete: "CASCADE",
});

Account.belongsTo(Client, {
  foreignKey: "client_number",
});

module.exports = { Client, Account, User };
