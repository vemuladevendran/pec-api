const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const requiredFields = require("../errors/error-handling");
const { roles, ADMIN, HOD } = require("../errors/roles");
const options = {
  timestamps: true,
};

AdminSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    name: {
      type: String,
      required: requiredFields("Name"),
    },
    // department: {
    //   type: String,
    //   trim: true,
    //   required: requiredFields("Department"),
    // },
    mobileNumber: {
      type: String,
      required: requiredFields("Mobile Number"),
      trim: true,
    },
    email: {
      type: String,
      required: requiredFields("Email"),
      trim: true,
    },
    role: {
      type: String,
      enum: roles,
      default: HOD,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  options
);

module.exports = mongoose.model("Admin", AdminSchema);
