"use strict";

const {
  createStudent,
  updateStudent,
  getStudents,
  getStudentById,
  deleteStudent,
  getStudentsByExamNumber,
} = require("../controllers/student/index");
const multer = require("multer");
const upload = multer({ dest: "uploads/students" });
const { checkToken } = require("../services/auth");

module.exports = function studentRoutes(app) {
  app.post("/api/v1/student", upload.single("photo"),checkToken, createStudent);
  app.put("/api/v1/student/:id", upload.single("photo"),checkToken, updateStudent);
  app.get("/api/v1/students", getStudents);
  app.get("/api/v1/students/examnumbers", getStudentsByExamNumber);
  app.get("/api/v1/student/:id", getStudentById);
  app.delete("/api/v1/student/:id", checkToken, deleteStudent);
};
