"use strict";

const {
    createAnnouncement,
    getAnnouncement,
    deleteAnnouncement
} = require("../controllers/announcement/index");
const multer = require("multer");
const upload = multer({ dest: "uploads/announcement" });
const { checkToken } = require("../services/auth");

module.exports = function announcementRoutes(app) {
    app.post("/api/v1/announcement", upload.single("image"),checkToken, createAnnouncement);
    app.get("/api/v1/announcement", checkToken, getAnnouncement),
    app.delete("/api/v1/announcement/:id", checkToken, deleteAnnouncement)
};
