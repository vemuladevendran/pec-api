const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const requiredFields = require("../errors/error-handling");
const options = {
    timestamps: true,
};

SemesterExamSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            default: uuidv4,
            unique: true,
        },
        studentName: {
            type: String,
            required: requiredFields("Student Name")
        },
        examNumber: {
            type: String,
            required: requiredFields("Exam number")
        },
        departmentName: {
            type: String,
            required: requiredFields("department name")
        },
        year: {
            type: String,
            required: requiredFields("year"),
        },
        exam: {
            type: String,
            required: requiredFields("Exam name")
        },
        subjects: [
            {
                subjectName: {
                    type: String,
                    required: requiredFields("Subject Name"),
                },
                mark: {
                    type: String,
                    required: requiredFields("Mark")
                }
            }
        ],

    },
    options
);

module.exports = mongoose.model("SemesterExam", SemesterExamSchema);
