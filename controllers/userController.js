const db = require("../config/db");

const validateUserData = (name, role, status) => {
  const validRoles = ["viewer", "analyst", "admin"];
  const validStatuses = ["active", "inactive"];

  if (!name || !role || !status) {
    return "Name, role, and status are required"
  }

  if (!validRoles.includes(role)) {
    return "Role must be viewer, analyst, or admin"
  }

  if (!validStatuses.includes(status)) {
    return "Status must be active or inactive"
  }

  return null;
}
const createUser = (req, res) => {
  const { name, role, status } = req.body;

  const validationError = validateUserData(name, role, status);

  if (validationError) {
    return res.status(400).json({
      message: validationError
    })
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

const getUserById = (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM users WHERE id = ?";

  db.execute(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching user",
        error: err.message
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    res.status(200).json({
      message: "User fetched successfully",
      user: results[0]
    })
  })
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, role, status } = req.body;

  const validationError = validateUserData(name, role, status);

  if (validationError) {
    return res.status(400).json({
      message: validationError
    })
  }

  const query = "UPDATE users SET name = ?, role = ?, status = ? WHERE id = ?";

  db.execute(query, [name, role, status, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error updating user",
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: Number(id),
        name,
        role,
        status
      }
    });
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM users WHERE id = ?";

  db.execute(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error deleting user",
        error: err.message
      })
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User deleted successfully"
    });
  });
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
