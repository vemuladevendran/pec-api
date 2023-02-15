"use strict";

const {
    createAnnouncement,
    getAnnouncement,
    deleteAnnouncement
} = require("../controllers/announcement/index");
const multer = require("multer");
const upload = multer({ dest: "uploads/announcement" });

module.exports = function announcementRoutes(app) {
    app.post("/api/v1/announcement", upload.single("image"), createAnnouncement);
    app.get("/api/v1/announcement", getAnnouncement)
    app.delete("/api/v1/announcement/:id", deleteAnnouncement)
};
