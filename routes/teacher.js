"use strict";

const {
  createTeacher,
  updataTeacher,
  getTeachers,
  deleteTeacher,
  getTeacherById,
} = require("../controllers/teacher/index");
const multer = require("multer");
const upload = multer({ dest: "uploads/teachers" });

module.exports = function teacherRoutes(app) {
  app.post("/api/v1/teacher", upload.single("photo"), createTeacher);
  app.put("/api/v1/teacher/:id", upload.single("photo"), updataTeacher);
  app.get("/api/v1/teacher", getTeachers);
  app.get("/api/v1/teacher/:id", getTeacherById);
  app.delete("/api/v1/teacher/:id", deleteTeacher);
};
