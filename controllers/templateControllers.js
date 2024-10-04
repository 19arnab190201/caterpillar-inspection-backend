const Template = require("../models/template");

// @desc    Create a new template
// @route   POST /api/templates
// @access  Private
exports.createTemplate = async (req, res) => {
  try {
    const { name, machine, sections, version } = req.body;

    const newTemplate = new Template({
      name,
      machine,
      sections,
      version,
    });

    const savedTemplate = await newTemplate.save();
    res.status(201).json(savedTemplate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all templates
// @route   GET /api/templates
// @access  Private
exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.status(200).json(templates);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get a single template by ID
// @route   GET /api/templates/:id
// @access  Private
exports.getTemplateById = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    res.status(200).json(template);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a template
// @route   PUT /api/templates/:id
// @access  Private
exports.updateTemplate = async (req, res) => {
  try {
    const { name, machineModel, sections, version } = req.body;

    const updatedTemplate = await Template.findByIdAndUpdate(
      req.params.id,
      { name, machineModel, sections, version },
      { new: true, runValidators: true }
    );

    if (!updatedTemplate) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.status(200).json(updatedTemplate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a template
// @route   DELETE /api/templates/:id
// @access  Private
exports.deleteTemplate = async (req, res) => {
  try {
    const deletedTemplate = await Template.findByIdAndDelete(req.params.id);

    if (!deletedTemplate) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.status(200).json({ message: "Template deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
