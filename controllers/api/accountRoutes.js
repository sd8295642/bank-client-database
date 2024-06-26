const router = require("express").Router();
const { Account } = require("../../models");
const withAuth = require("../../utils/auth")

router.get("/:account_number", withAuth, async (req, res) => {
  try {
    const accountData = await Account.findOne(req.params.account_number, {
      where: { account_number: req.params.account_number }
    });
    if (!accountData) {
      res.status(404).json({ message: "No accounts found!" });
      return;
    }
    res.status(200).json(accountData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const accountData = await Account.create(req.body);
    const account = accountData.get({plain:true})
    
    res.status(200).json(account);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
