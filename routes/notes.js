"use strict";

const {
    uploadNotes,
    getNotes,
    getNotesByID
} = require("../controllers/notes/index");
const multer = require("multer");
const upload = multer({ dest: "uploads/notes" });

module.exports = function notesRoutes(app) {
    app.post("/api/v1/notes", upload.single("pdfFile"), uploadNotes);
    app.get("/api/v1/notes", getNotes)
    app.get("/api/v1/notes/:id", getNotesByID)
};
