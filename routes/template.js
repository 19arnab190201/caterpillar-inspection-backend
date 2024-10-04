const express = require("express");
const router = express.Router();
const {
  createTemplate,
  getTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
} = require("../controllers/templateControllers");

// Protect these routes if necessary with middleware (e.g., authentication)
router.post("/", createTemplate);
router.get("/", getTemplates);
router.get("/:id", getTemplateById);
router.put("/:id", updateTemplate);
router.delete("/:id", deleteTemplate);

module.exports = router;
