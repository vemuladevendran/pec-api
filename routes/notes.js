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
const { checkToken } = require("../services/auth");

module.exports = function notesRoutes(app) {
    app.post("/api/v1/notes", upload.single("pdfFile"),checkToken, uploadNotes);
    app.get("/api/v1/notes",checkToken, getNotes);
    app.get("/api/v1/notes/units",checkToken, getUnitWiseNotes);
    app.get("/api/v1/notes/:id",checkToken, getNotesById);
    app.delete("/api/v1/notes/:id",checkToken, deleteNotes);
};
