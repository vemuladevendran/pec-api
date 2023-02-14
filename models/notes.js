const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const requiredFields = require("../errors/error-handling");
const options = {
    timestamps: true,
};

NotesSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            default: uuidv4,
            unique: true,
        },
        departmentName: { type: String, required: true },
        year: { type: String, required: true },
        semester: { type: String, required: true },
        subject: {
            type: String,
            required: requiredFields('subject name')
        },
        unit: { type: String, required: true },
        pdfFile: { type: String, required: true },
        isDeleted: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    options
);

module.exports = mongoose.model("Notes", NotesSchema);
