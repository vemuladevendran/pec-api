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

module.exports = function studentRoutes(app) {
  app.post("/api/v1/student", upload.single("photo"), createStudent);
  app.put("/api/v1/student/:id", upload.single("photo"), updateStudent);
  app.get("/api/v1/students", getStudents);
  app.get("/api/v1/students/examnumbers", getStudentsByExamNumber);
  app.get("/api/v1/student/:id", getStudentById);
  app.delete("/api/v1/student/:id", deleteStudent);
};
