const express = require("express");
const router = express.Router();
const {
  createInspection,
  getInspections,
  getInspectionById,
  updateInspection,
  deleteInspection,
  getAllInspectionByUserId,
} = require("../controllers/inspectionControllers");

// Protect these routes if necessary with middleware (e.g., authentication)
router.post("/", createInspection);
router.get("/", getInspections);
router.get("/getMyReports/:id", getAllInspectionByUserId);
router.get("/:id", getInspectionById);
router.put("/:id", updateInspection);
router.delete("/:id", deleteInspection);

module.exports = router;
