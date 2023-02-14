const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const requiredFields = require("../errors/error-handling");
const options = {
    timestamps: true,
};

InternalExamSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            default: uuidv4,
            unique: true,
        },

        departmentName: {
            type: String,
            required: requiredFields("department name")
        },
        year: {
            type: String,
            required: requiredFields("year"),
        },
        semester: {
            type: String,
            required: requiredFields("semester"),
        },
        exam: {
            type: String,
            required: requiredFields('Exam Name'),
        },
        subject: {
            type: String,
            required: requiredFields('Subject Name'),
        },
        students: [
            {
                examNumber: {
                    type: String,
                    required: requiredFields('Exam Number'),
                },
                studentName: {
                    type: String,
                    required: requiredFields('Student'),
                },
                marks: {
                    type: String,
                    required: requiredFields('Marks'),
                },
            }
        ]
    },
    options
);

module.exports = mongoose.model("InternalExam", InternalExamSchema);
