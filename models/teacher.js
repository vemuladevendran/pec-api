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
      required: requiredFields("Teacher Name"),
    },
    teacherTitle: {
      type: String,
      trim: true,
      // required: requiredFields("Teacher Title"),
    },
    teacherId: {
      type: String,
      trim: true,
      required: requiredFields("Teacher Id"),
    },
    email: {
      type: String,
      required: requiredFields("Email"),
    },
    department: {
      type: String,
      required: requiredFields("department"),
    },
    password: {
      type: String,
      default: null,
    },
    mobileNumber: {
      type: String,
      trim: true,
    },
    majorSubject: {
      type: String,
      required: [true, requiredFields("Major Subject")],
    },
    handlingSubjects: {
      type: Array,
      required: [true],
    },
    role: {
      type: String,
      enum: roles,
      default: TEACHER,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  options
);

module.exports = mongoose.model("Teacher", TeacherSechema);
