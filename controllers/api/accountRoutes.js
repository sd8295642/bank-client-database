const router = require("express").Router();
const { Client, Account } = require("../../models");
const withAuth = require("../../utils/auth")

router.get("/:account_number", withAuth, async (req, res) => {
  
  try {
    const accountData = await Account.findByPk(req.params.account_number, {
      //include: [{ model: Product, through: ProductTag }]
    });
    if (!accountData) {
      res.status(404).json({ message: "No accounts found!" });
      return;
    }
    res.render('homepage', accountData)
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/", withAuth, async (req, res) => {

  try {
    const accountData = await Account.create(req.body);
    res.status(200).json(accountData);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.put("/:account_number", withAuth, async (req, res) => {

  try {
    const accountData = await Account.update(req.body, {
      where: { account_number: req.params.account_number },
    });
    res.status(200).json(accountData);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
