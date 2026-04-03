const express = require("express");
const router = express.Router();

const { createUser, getUsers, getUserById, updateUser } = require("../controllers/userController");

router.post("/users", createUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
  module.exports = router;
