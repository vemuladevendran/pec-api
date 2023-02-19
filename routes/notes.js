"use strict";

const {
    uploadNotes,
    getNotes,
    getNotesById,
    deleteNotes,
    getUnitWiseNotes
} = require("../controllers/notes/index");
const multer = require("multer");
const upload = multer({ dest: "uploads/notes" });

module.exports = function notesRoutes(app) {
    app.post("/api/v1/notes", upload.single("pdfFile"), uploadNotes);
    app.get("/api/v1/notes", getNotes);
    app.get("/api/v1/notes/units", getUnitWiseNotes);
    app.get("/api/v1/notes/:id", getNotesById);
    app.delete("/api/v1/notes/:id", deleteNotes);
};
