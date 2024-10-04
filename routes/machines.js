const express = require("express");
const router = express.Router();
const {
  createMachine,
  getMachines,
  getMachineById,
  updateMachine,
  getMachineBySerialNumber,
  deleteMachine,
} = require("../controllers/machineControllers");

// Protect these routes if necessary with middleware (e.g., authentication)
router.post("/createmachine", createMachine);
router.get("/getmachinesbyserial/:serialNumber", getMachineBySerialNumber);
router.get("/", getMachines);
router.get("/:id", getMachineById);
router.put("/:id", updateMachine);
router.delete("/:id", deleteMachine);

module.exports = router;
