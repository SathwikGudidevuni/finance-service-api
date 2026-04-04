const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controllers/dashboardController");
const allowRoles = require("../middlewares/roleMiddleware");

router.get("/dashboard", allowRoles(["viewer", "analyst", "admin"]), getDashboard);

module.exports = router;
