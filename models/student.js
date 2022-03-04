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
    photo: {
      type: String,
    },
    studentName: {
      type: String,
      required: requiredFields("Student Name"),
    },
    rollNumber: {
      type: String,
      unique: true,
      uppercase: true,
      required: requiredFields("Roll Number"),
      trim: true,
    },
    examNumber: {
      type: String,
      unique: true,
      required: requiredFields("Exam Number"),
      trim: true,
    },
    department: {
      type: String,
      required: requiredFields("Department"),
    },
    year: {
      type: String,
      required: requiredFields("year"),
    },
    section: {
      type: String,
      required: requiredFields("section"),
      trim: true,
    },
    semester: {
      type: String,
      required: requiredFields("section"),
    },
    mobileNumber: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      required: requiredFields("Address"),
    },
    roles: {
      type: String,
      enum: roles,
      default: STUDENT,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: String,
      default: "Deva",
    },
  },
  options
);

module.exports = mongoose.model("Student", StudentSchema);
