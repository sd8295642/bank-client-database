const router = require("express").Router();
const { Client, Account } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/:client_number", withAuth, async (req, res) => {
  try {
    const clientData = await Client.findOne({
      where: { client_number: req.params.client_number },
      include: [Account]
    });

    const client = clientData.get({plain: true})
    
    if (!clientData) {
      res.status(404).json({ message: "No clients found!" });
      return;
    }
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
      const newClient = await Client.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newClient);
    } catch (err) {
      res.status(400).json(err);
    }
  })

module.exports = router;
