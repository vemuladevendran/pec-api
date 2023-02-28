const {
  createAdmin,
  updateAdmin,
  getAdmins,
  getAdminsById,
  deleteAdmin,
} = require("../controllers/admin/index");
const { checkToken } = require("../services/auth");

module.exports = function adminRoutes(app) {
  app.post("/api/v1/admin",checkToken, createAdmin);
  app.get("/api/v1/admin",checkToken, getAdmins);
  app.get("/api/v1/admin/:id",checkToken, getAdminsById);
  app.put("/api/v1/admin/:id",checkToken, updateAdmin);
  app.delete("/api/v1/admin/:id",checkToken, deleteAdmin);
};
