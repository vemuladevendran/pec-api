const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const requiredFields = require("../errors/error-handling");
const options = {
  timestamps: true,
};

const DepartmentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    departmentName: {
      type: String,
      required: requiredFields("departmentName"),
    },
    departmentCode: {
      type: String,
      trim: true,
      required: requiredFields("departmentCode"),
    },
    departmentHod: {
      type: String,
      required: requiredFields("departmentHod"),
    },
    years: {
      firstYear: {
        type: Array,
        required: requiredFields("First Year Details"),
      },
      secondYear: {
        type: Array,
        required: requiredFields("Second Year Details"),
      },
      thirdYear: {
        type: Array,
        required: requiredFields("Third Year Details"),
      },
      fourthYear: {
        type: Array,
        required: requiredFields("Fourth Year Details"),
      },
    },
    createdBy: {
      type: String,
      default: "ABC",
      required: true,
    },
  },
  options
);

module.exports = mongoose.model("Department", DepartmentSchema);
