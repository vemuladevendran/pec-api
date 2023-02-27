"use strict";

const {
    uploadAssignments,
    getAssignments,
    deleteAssignment,
    assignMartks,
} = require("../controllers/assignments/index");
const multer = require("multer");
const upload = multer({ dest: "uploads/assignments" });

module.exports = function assignmentsRoutes(app) {
    app.post("/api/v1/assignments", upload.single("pdfFile"), uploadAssignments);
    app.get("/api/v1/assignments", getAssignments);
    app.delete("/api/v1/assignments/:id", deleteAssignment);
    app.put("/api/v1/assignments/:id", assignMartks);
};
