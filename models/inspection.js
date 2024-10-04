const mongoose = require("mongoose");

const InspectionSchema = new mongoose.Schema({
  machine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Machine",
    required: true,
  },
  inspector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  geoCoordinates: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  sections: [
    {
      sectionName: { type: String, required: true },
      parameters: [
        {
          parameterName: { type: String, required: true },
          expectedValue: { type: String },
          value: {
            type: String,
          },
          parameterType: {
            type: String,
            enum: ["Text", "Number", "Boolean"],
            required: true,
          },
        },
      ],
    },
  ],
  reportSummary: {
    type: String,
    default: "",
  },
  reportStatus: {
    type: String,
    enum: ["In Progress", "Completed"],
    default: "In Progress",
  },
  languageUsed: {
    type: String,
    enum: ["English", "Hindi", "Spanish"], // Add more languages as required
    default: "English",
  },
});

const Inspection = mongoose.model("Inspection", InspectionSchema);
module.exports = Inspection;
