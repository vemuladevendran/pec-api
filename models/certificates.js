const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const options = {
    timestamps: true,
};

CertificatesSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            default: uuidv4,
            unique: true,
        },
        studentName: {
            type: String,
            required: true,
        },
        examNumber: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        document: {
            type: String,
            required: true,
        },
        documentType: {
            type: String,
            required: true,
        },
    },
    options
);

module.exports = mongoose.model("Certificates", CertificatesSchema);
