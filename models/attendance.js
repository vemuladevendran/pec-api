const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const options = {
    timestamps: true,
};

AttendanceSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            default: uuidv4,
            unique: true,
        },
        date: {
            type: Date,
            default: new Date(),
            required: true
        },
        departmentName: { type: String, required: true },
        year: { type: String, required: true },
        section: { type: String, required: true },
        periodNumber: { type: String, required: true },
        subject: { type: String, required: true },
        absentCount: { type: String, default: 0 },
        students: [
            {
                examNumber: { type: String, required: true },
                attendance: { type: Boolean, required: true }
            }
        ],
    },
    options
);

module.exports = mongoose.model("Attendance", AttendanceSchema);
