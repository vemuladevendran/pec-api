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
      required: [true, requiredFields("departmentName")],
    },
    departmentCode: {
      type: String,
      trim: true,
      required: [true, requiredFields("departmentCode")],
    },
    departmentHod: {
      type: String,
      required: [true, requiredFields("departmentHod")],
    },
    years: {
      firstYear: {
        type: Array,
        required: [true, requiredFields("First Year Details")],
      },
      secondYear: {
        type: Array,
        required: [true, requiredFields("Second Year Details")],
      },
      thirdYear: {
        type: Array,
        required: [true, requiredFields("Third Year Details")],
      },
      fourthYear: {
        type: Array,
        required: [true, requiredFields("Fourth Year Details")],
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
