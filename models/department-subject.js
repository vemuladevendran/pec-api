const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const requiredFields = require("../errors/error-handling");
const { years } = require("../errors/years");
const options = {
  timestamps: true,
};

const DepartmentSubjects = new mongoose.Schema(
    {
      id: {
        type: String,
        default: uuidv4,
        unique: true,
      },
      departmentName: {
        type: String,
        required: requiredFields("Department name"),
      },
      year: {
        type: String,
        enum: years,
        required: requiredFields("Year"),
      },
      subjects: {
        type: Array,
        required: requiredFields("subjects"),
      },
    },
    options
  );
  
  
  module.exports = mongoose.model("DepartmentSubjects", DepartmentSubjects);
  