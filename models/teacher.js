const mongoose = require("mongoose");
const requiredFields = require("../errors/error-handling");
const { v4: uuidv4 } = require("uuid");
const { roles, TEACHER } = require("../errors/roles");
const options = {
  timestamps: true,
};

const TeacherSechema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    photo: {
      type: String,
      trim: true,
    },
    teacherName: {
      type: String,
      required: [true, requiredFields("Teacher Name")],
    },
    teacherTitle: {
      type: String,
      trim: true,
      required: [true, requiredFields("Teacher Title")],
    },
    teacherId: {
      type: String,
      trim: true,
      required: [true, requiredFields("Teacher Id")],
    },
    email: {
      type: String,
      required: [true, requiredFields("Email")],
    },
    mobileNumber: {
      type: String,
      trim: true,
    },
    majorSubject: {
      type: String,
      required: [true, requiredFields("Major Subject")],
    },
    handlingSubject: {
      type: Array,
    },
    role: {
      type: String,
      enum: roles,
      default: TEACHER,
    },
  },
  options
);

module.exports = mongoose.model("Teacher", TeacherSechema);
