const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const requiredFields = require("../errors/error-handling");
const options = {
    timestamps: true,
};

PlacementSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            default: uuidv4,
            unique: true,
        },
        studentName: {
            type: String,
            required: requiredFields("Student Name"),
        },
        examNumber: {
            type: String,
            required: requiredFields("Exam Number"),
        },
        departmentName: {
            type: String,
            required: requiredFields("Department"),
        },
        companyName: {
            type: String,
            require: requiredFields("Company Name"),
        },
        attendingDate: {
            type: String,
            required: requiredFields("Attending date")
        },
        jobStatus: {
            type: String,
            default: 'onprocess'
        },
    },
    options
);

module.exports = mongoose.model("Placement", PlacementSchema);
