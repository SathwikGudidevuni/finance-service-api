const express = require("express");
const router = express.Router();

const { createUser, getUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController");

const allowRoles = require("../middlewares/roleMiddleware");

router.post("/users", allowRoles(["admin"]), createUser);
router.get("/users", allowRoles(["analyst", "admin"]), getUsers);
router.get("/users/:id", allowRoles(["analyst", "admin"]), getUserById);
router.put("/users/:id", allowRoles(["admin"]), updateUser);
router.delete("/users/:id", allowRoles(["admin"]), deleteUser);

module.exports = router;
