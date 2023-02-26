const {
  createDepartment,
  getDepartment,
  getHods,
  getDepartmentById,
  deleteDepartment,
  getSections,
  updateDepartment
} = require("../controllers/department/index");

module.exports = function departmentRoutes(app) {
  app.post("/api/v1/department", createDepartment),
    app.put("/api/v1/department/:id", updateDepartment),
    app.get("/api/v1/department", getDepartment),
    app.get("/api/v1/department/hod", getHods),
    app.get("/api/v1/department/:id", getDepartmentById),
    app.get("/api/v1/department/sections/:departmentName/:year", getSections),
    app.delete("/api/v1/department/:id", deleteDepartment);
};
