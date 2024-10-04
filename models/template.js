const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  machine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Machine",
    required: true,
  },
  sections: [
    {
      sectionName: { type: String, required: true },
      parameters: [
        {
          parameterName: { type: String, required: true },
          expectedValue: { type: String },
          parameterType: {
            type: String,
            enum: ["Text", "Number", "Boolean"],
            required: true,
          },
        },
      ],
    },
  ],
  version: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Template = mongoose.model("Template", TemplateSchema);
module.exports = Template;
