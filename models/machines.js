const mongoose = require("mongoose");

const MachineSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  purchaseDate: {
    type: Date,
  },
  inspectionTemplate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Template",
    required: true,
  },
  lastInspectionDate: {
    type: Date,
  },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Under Maintenance"],
    default: "Active",
  },
  inspectionHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inspection",
    },
  ],
});

const Machine = mongoose.model("Machine", MachineSchema);
module.exports = Machine;
