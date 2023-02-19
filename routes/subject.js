const {
  createSubject,
  getSubjects,
  deleteSubject,
  createDepartmentSubject,
  getDepartmentSubjects,
  deleteDepartmentSubject,
  getTimeTableSubjects
} = require("../controllers/subject/index");

module.exports = function subjectRoutes(app) {
  app.post("/api/v1/subject", createSubject);
  app.get("/api/v1/subject", getSubjects);
  app.delete("/api/v1/subject/:id", deleteSubject);
  app.post("/api/v1/departmentSubject", createDepartmentSubject);
  app.get("/api/v1/departmentSubject", getDepartmentSubjects);
  app.get("/api/v1/timeTableSubject", getTimeTableSubjects);
  app.delete("/api/v1/departmentSubject/:id", deleteDepartmentSubject);
};
