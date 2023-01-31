const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const requiredFields = require("../errors/error-handling");
const options = {
    timestamps: true,
};

const TimeTableSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            default: uuidv4,
            unique: true,
        },
        departmentName: {
            type: String,
            required: requiredFields("department Name"),
        },
        year: {
            type: String,
            trim: true,
            required: requiredFields("year"),
        },
        section: {
            type: String,
            required: requiredFields("section"),
        },
        timeTable: {
            monday: {},
            tuesday: {},
            wednesday: {},
            thursday: {},
            friday: {},
        },
        createdBy: {
            type: String,
            default: "ABC",
            required: true,
        },
    },
    options
);

module.exports = mongoose.model("timeTable", TimeTableSchema);
