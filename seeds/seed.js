const sequelize = require("../config/connection");
const { User, Client, Account } = require("../models");

const userData = require("./userData.json");
const clientData = require("./clientData.json");
const accountData = require("./accountData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const clients = await Client.bulkCreate(clientData, {
    individualHooks: true,
    returning: true,
  });

  const clientMap = {};
  clients.forEach((client) => {
    clientMap[client.client_number] = client.client_number;
  });

  console.log(clientMap);

  for (const account of accountData) {
    console.log(
      "Creating account with client_number:",
      clientMap[account.client_number]
    );
    await Account.create({
      ...account,
      client_number: clientMap[account.client_number],
    });
  }

  // for (const account of accountData) {
  //   await Account.create({
  //     ...account,
  //     client_number:
  //       clients[Math.floor(Math.random() * clients.length)].account_number,
  //   });
  // }

  process.exit(0);
};

seedDatabase();
