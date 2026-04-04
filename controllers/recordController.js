const db = require("../config/db");

const validateRecordData = (amount, type, category, record_date) => {
  const validTypes = ["income", "expense"];

  if (!amount || !type || !category || !record_date) {
    return "Amount, type, category, and record_date are required";
  }

  if (!validTypes.includes(type)) {
    return "Type must be income or expense";
  }

  return null;
};

const createRecord = (req, res) => {
  const { amount, type, category, record_date, notes } = req.body;

  const validateError = validateRecordData(amount, type, category, record_date);

  if (validateError) {
    return res.status(400).json({
      message: validateError
    });
  }

  const query = "INSERT INTO financial_records (amount, type, category, record_date, notes) VALUES (?, ?, ?, ?, ?)";

  db.execute(query, [amount, type, category, record_date, notes || null], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error creating financial record",
        error: err.message
      });
    }

    res.status(201).json({
      message: "Financial record created successfully",
      record: {
        id: result.insertId,
        amount,
        type,
        category,
        record_date,
        notes: notes || null
      }
    });
  });
};

const getRecords = (req, res) => {
  const query = "SELECT * FROM financial_records";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching financial records",
        error: err.message
      });
    }

    res.status(200).json({
      message: "Financial records fetched successfully",
      record: results
    });
  });
};

const getRecordbyId = (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM financial_records WHERE id = ?";

  db.execute(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching financial record",
        error: err.message
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Financial record not found"
      })
    }

    res.status(200).json({
      message: "Financial record fetched successfully",
      record: results[0]
    });
  });
};

const updateRecord = (req, res) => {
  const { id } = req.params;
  const { amount, type, category, record_date, notes } = req.body;

  const validateError = validateRecordData(amount, type, category, record_date);

  if (validateError) {
    return res.status(400).json({
      message: validateError
    });
  }

  const query = "UPDATE financial_records SET amount = ?, type = ?, category = ?, record_date = ?, notes = ? WHERE id = ?";

  db.execute(query, [amount, type, category, record_date, notes || null, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error updating financial record",
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Financial record not found"
      });
    }

    res.status(200).json({
      message: "Financial record updated successfully",
      record: {
        id: Number(id),
        amount,
        type,
        category,
        record_date,
        notes: notes || null
      }
    });
  });
};

const deleteRecord = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM financial_records WHERE id = ?";

  db.execute(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error deleting financial record",
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Financial record not found"
      });
    }

    res.status(200).json({
      message: "Financial record deleted successfully"
    });
  });
};

module.exports = { createRecord, getRecords, getRecordbyId, updateRecord, deleteRecord };
