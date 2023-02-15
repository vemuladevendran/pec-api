const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const requiredFields = require("../errors/error-handling");
const options = {
    timestamps: true,
};

AnnouncementSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            default: uuidv4,
            unique: true,
        },
        title: {
            type: String,
            required: requiredFields('Title')
        },
        image: {
            type: String,
            required: requiredFields('Image')
        },
        url: {
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

module.exports = mongoose.model("Announcement", AnnouncementSchema);
