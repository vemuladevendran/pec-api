const {
  createDepartment,
  getDepartment,
  getDepartmentById,
  deleteDepartment,
} = require("../controllers/department/index");

module.exports = function departmentRoutes(app) {
  app.post("api/v1/department", createDepartment),
    app.get("api/v1/department", getDepartment),
    app.get("api/v1/department/:id", getDepartmentById),
    app.delete("api/v1/department/:id", deleteDepartment);
};
