const Inspection = require("../models/inspection");

// @desc    Create a new inspection
// @route   POST /api/inspections
// @access  Private
exports.createInspection = async (req, res) => {
  try {
    const {
      machine,
      inspector,
      templateUsed,
      date,
      geoCoordinates,
      sections,
      reportSummary,
      reportStatus,
      languageUsed,
    } = req.body;

    const newInspection = new Inspection({
      machine,
      inspector,
      templateUsed,
      date,
      geoCoordinates,
      sections,
      reportSummary,
      reportStatus,
      languageUsed,
    });

    const savedInspection = await newInspection.save();
    res.status(201).json(savedInspection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all inspections
// @route   GET /api/inspections
// @access  Private
exports.getInspections = async (req, res) => {
  try {
    const inspections = await Inspection.find().populate(
      "machine inspector templateUsed"
    );
    res.status(200).json(inspections);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get a single inspection by ID
// @route   GET /api/inspections/:id
// @access  Private
exports.getInspectionById = async (req, res) => {
  try {
    const inspection = await Inspection.findById(req.params.id).populate(
      "machine inspector templateUsed"
    );
    if (!inspection) {
      return res.status(404).json({ message: "Inspection not found" });
    }
    res.status(200).json(inspection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update an inspection
// @route   PUT /api/inspections/:id
// @access  Private
exports.updateInspection = async (req, res) => {
  try {
    const {
      machine,
      inspector,
      templateUsed,
      date,
      geoCoordinates,
      sections,
      reportSummary,
      reportStatus,
      languageUsed,
    } = req.body;

    const updatedInspection = await Inspection.findByIdAndUpdate(
      req.params.id,
      {
        machine,
        inspector,
        templateUsed,
        date,
        geoCoordinates,
        sections,
        reportSummary,
        reportStatus,
        languageUsed,
      },
      { new: true, runValidators: true }
    );

    if (!updatedInspection) {
      return res.status(404).json({ message: "Inspection not found" });
    }

    res.status(200).json(updatedInspection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete an inspection
// @route   DELETE /api/inspections/:id
// @access  Private
exports.deleteInspection = async (req, res) => {
  try {
    const deletedInspection = await Inspection.findByIdAndDelete(req.params.id);

    if (!deletedInspection) {
      return res.status(404).json({ message: "Inspection not found" });
    }

    res.status(200).json({ message: "Inspection deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all inspections by a user
// @route   GET /api/inspections/getMyReports/:id
// @access  Private

exports.getAllInspectionByUserId = async (req, res) => {
  try {
    console.log(req.params.id);
    const inspections = await Inspection.find({
      inspector: req.params.id,
    }).populate("machine inspector");

    if (!inspections) {
      return res.status(404).json({ message: "Inspections not found" });
    }
    res.status(200).json(inspections);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
