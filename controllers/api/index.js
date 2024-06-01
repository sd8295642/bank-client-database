const router = require("express").Router();
const userRoutes = require("./userRoutes");
const clientRoutes = require("./clientRoutes");
const accountRoutes = require("./accountRoutes.js");

router.use("/users", userRoutes);
router.use("/clients", clientRoutes);
router.use("/accounts", accountRoutes); 

module.exports = router;
