const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const requiredFields = require("../errors/error-handling");
const { roles, STUDENT } = require("../errors/roles");
const options = {
  timestamps: true,
};

const StudentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    studentName: {
      type: String,
      required: [true, requiredFields("Student Name")],
      trim: true,
    },
    rollNumber: {
      type: String,
      unique: true,
      uppercase: true,
      required: [true, requiredFields("Roll Number")],
      trim: true,
    },
    examNumber: {
      type: String,
      unique: true,
      required: [true, requiredFields("Exam Number")],
      trim: true,
    },
    department: {
      type: String,
      required: [true, requiredFields("Department")],
    },
    year: {
      type: String,
      required: [true, requiredFields("year")],
      trim: true,
    },
    section: {
      type: String,
      required: [true, requiredFields("section")],
      trim: true,
    },
    mobileNumber: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: email,
      require: true,
      unique: true,
    },
    address: {
      type: String,
      required: [true, requiredFields("Address")],
    },
    roles: {
      type: String,
      enum: roles,
      default: STUDENT,
    },
    isDeleted: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: String,
      default: "Deva",
    },
  },
  options
);

module.exports = mongoose.model("Student", StudentSchema);
