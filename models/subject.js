const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const requiredFields = require("../errors/error-handling");
const { years } = require("../errors/years");
const options = {
  timestamps: true,
};

const SubjectSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    subjectName: {
      type: String,
      required: requiredFields("subject name"),
    },
    subjectCode: {
      type: String,
      required: requiredFields("subject code"),
    },
  },
  options
);
module.exports = mongoose.model("Subject", SubjectSchema);
