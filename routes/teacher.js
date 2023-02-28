"use strict";

const {
  createTeacher,
  updataTeacher,
  getTeachers,
  deleteTeacher,
  getTeacherById,
  getTeachersName,
} = require("../controllers/teacher/index");
const multer = require("multer");
const upload = multer({ dest: "uploads/teachers" });
const { checkToken } = require("../services/auth");

module.exports = function teacherRoutes(app) {
  app.post("/api/v1/teacher", upload.single("photo"),checkToken, createTeacher);
  app.put("/api/v1/teacher/:id", upload.single("photo"),checkToken, updataTeacher);
  app.get("/api/v1/teacher", getTeachers);
  app.get("/api/v1/teacher-name", getTeachersName);
  app.get("/api/v1/teacher/:id", getTeacherById);
  app.delete("/api/v1/teacher/:id",checkToken, deleteTeacher);
};
