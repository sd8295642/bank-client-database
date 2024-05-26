const router = require("express").Router();
const { Client, Account } = require("../../models");
const withAuth = require("../../utils/auth")

router.get("/:client_number", withAuth, async (req, res) => {
  try {
    const clientData = await Client.findByPk(req.params.client_number, {
      //include: [{ model: Product, through: ProductTag }]
    });
    if (!clientData) {
      res.status(404).json({ message: "No clients found!" });
      return;
    }
    res.status(200).json(clientData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/", withAuth, async (req, res) => {
  try {
    const clientData = await Client.create(req.body);
    res.status(200).json(clientData);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.put("/:client_number", withAuth, async (req, res) => {
  try {
    const clientData = await Client.update(req.body, {
      where: { client_number: req.params.client_number },
    });
    res.status(200).json(clientData);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
