const Machine = require("../models/machines");

// @desc    Create a new machine
// @route   POST /api/machines
// @access  Private
exports.createMachine = async (req, res) => {
  try {
    const {
      owner,
      model,
      serialNumber,
      purchaseDate,
      lastInspectionDate,
      location,
      status,
    } = req.body;

    const newMachine = new Machine({
      owner,
      model,
      serialNumber,
      purchaseDate,
      lastInspectionDate,
      location,
      status,
    });

    const savedMachine = await newMachine.save();
    res.status(201).json(savedMachine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all machines
// @route   GET /api/machines
// @access  Private
exports.getMachines = async (req, res) => {
  try {
    const machines = await Machine.find().populate("owner");
    res.status(200).json(machines);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get a single machine by ID
// @route   GET /api/machines/:id
// @access  Private
exports.getMachineById = async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id).populate("owner");
    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }
    res.status(200).json(machine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a machine
// @route   PUT /api/machines/:id
// @access  Private
exports.updateMachine = async (req, res) => {
  try {
    const {
      model,
      serialNumber,
      purchaseDate,
      lastInspectionDate,
      inspectionTemplate,
      location,
      status,
    } = req.body;

    const updatedMachine = await Machine.findByIdAndUpdate(
      req.params.id,
      {
        model,
        serialNumber,
        purchaseDate,
        lastInspectionDate,
        location,
        status,
        inspectionTemplate,
      },
      { new: true, runValidators: true }
    );

    if (!updatedMachine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    res.status(200).json(updatedMachine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a machine
// @route   DELETE /api/machines/:id
// @access  Private
exports.deleteMachine = async (req, res) => {
  try {
    const deletedMachine = await Machine.findByIdAndDelete(req.params.id);

    if (!deletedMachine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    res.status(200).json({ message: "Machine deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//desc Get machines by serial number

exports.getMachineBySerialNumber = async (req, res) => {
  try {
    const machines = await Machine.find({
      serialNumber: req.params.serialNumber,
    })
      .populate("owner")
      .populate("inspectionTemplate");

    res.status(200).json({
      status: "success",
      data: machines[0],
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
