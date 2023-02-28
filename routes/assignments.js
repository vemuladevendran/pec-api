"use strict";

const {
    uploadAssignments,
    getAssignments,
    deleteAssignment,
    assignMartks,
} = require("../controllers/assignments/index");
const multer = require("multer");
const { checkToken } = require("../services/auth");
const upload = multer({ dest: "uploads/assignments" });

module.exports = function assignmentsRoutes(app) {
    app.post("/api/v1/assignments", upload.single("pdfFile"), checkToken, uploadAssignments);
    app.get("/api/v1/assignments", checkToken, getAssignments);
    app.delete("/api/v1/assignments/:id",checkToken, deleteAssignment);
    app.put("/api/v1/assignments/:id",checkToken, assignMartks);
};
