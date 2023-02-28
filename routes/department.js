const {
  createDepartment,
  getDepartment,
  getHods,
  getDepartmentById,
  deleteDepartment,
  getSections,
  updateDepartment
} = require("../controllers/department/index");
const { checkToken } = require("../services/auth");

module.exports = function departmentRoutes(app) {
  app.post("/api/v1/department",checkToken, createDepartment),
    app.put("/api/v1/department/:id",checkToken, updateDepartment),
    app.get("/api/v1/department", getDepartment),
    app.get("/api/v1/department/hod", getHods),
    app.get("/api/v1/department/:id", getDepartmentById),
    app.get("/api/v1/department/sections/:departmentName/:year", getSections),
    app.delete("/api/v1/department/:id",checkToken, deleteDepartment);
};
