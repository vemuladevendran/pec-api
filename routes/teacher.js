"use strict";

const { createTeacher, getTeachers } = require("../controllers/teacher/index");
const multer = require("multer");
const upload = multer({ dest: "uploads/teachers" });

module.exports = function teacherRoutes(app) {
  app.post("/api/v1/teacher", upload.single("photo"), createTeacher);
  app.get("/api/v1/teacher", getTeachers);
};
