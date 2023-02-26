const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const requiredFields = require("../errors/error-handling");
const options = {
    timestamps: true,
};

AssignmentsSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            default: uuidv4,
            unique: true,
        },
        studentName: {
            type: String,
            required: requiredFields('Student Name')
        },
        examNumber: {
            type: String,
            required: requiredFields('Exam Number')
        },
        departmentName: {
            type: String,
            required: requiredFields("Department Name")
        },
        year: {
            type: String,
            required: requiredFields("Year")
        },
        section: {
            type: String,
            required: requiredFields("Section")
        },
        subject: {
            type: String,
            required: requiredFields("Subject")
        },
        unit: {
            type: String,
            required: requiredFields("Unit")
        },
        pdfFile: {
            type: String,
            required: requiredFields("PDF FILE")
        },
        marks: {
            type: String
        },
        isDeleted: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    options
);

module.exports = mongoose.model("Assignments", AssignmentsSchema);
