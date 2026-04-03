const express = require("express");
const router = express.Router();

const { createUser, getUsers, getUserById } = require("../controllers/userController");

router.post("/users", createUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);

module.exports = router;
