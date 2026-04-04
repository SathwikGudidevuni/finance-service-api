const express = require("express");
const router = express.Router();

const { createRecord, getRecords, getRecordbyId, updateRecord, deleteRecord } = require("../controllers/recordController");
const allowRoles = require("../middlewares/roleMiddleware");

router.post("/records", allowRoles(["admin"]), createRecord);
router.get("/records", allowRoles(["analyst", "admin"]), getRecords);
router.get("/records/:id", allowRoles(["analyst", "admin"]), getRecordbyId);
router.put("/records/:id", allowRoles(["admin"]), updateRecord);
router.delete("/records/:id", allowRoles(["admin"]), deleteRecord);

module.exports = router;
