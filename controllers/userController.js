const db = require("../config/db");

const createUser = (req, res) => {
  const { name, role, status } = req.body;

  const validRoles = ["viewer", "analyst", "admin"];
  const validStatuses = ["active", "inactive"];

  if (!name || !role || !status) {
    return res.status(400).json({
      message: "Name, role, and status are required"
    });
  }

  if (!validRoles.includes(role)) {
    return res.status(400).json({
      message: "Role must be viewer, analyst, or admin"
    });
  }

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      message: "Status must be active or inactive"
    });
  }



  const query = "INSERT INTO users (name, role, status) VALUES (?, ?, ?)";

  db.execute(query, [name, role, status], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error creating user",
        error: err.message
      });
    }

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: result.insertId,
        name,
        role,
        status
      }
    });
  });
};

const getUsers = (req, res) => {
  const query = "SELECT * FROM users";

  db.execute(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching users",
        error: err.message
      });
    }

    res.status(200).json({
      message: "Users fetched successfully",
      users: results
    });
  });
};

module.exports = { createUser, getUsers };
