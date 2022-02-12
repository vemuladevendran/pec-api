const {
  createAdmin,
  updateAdmin,
  getAdmins,
  getAdminsById,
  deleteAdmin,
} = require("../controllers/admin/index");

module.exports = function adminRoutes(app) {
  app.post("/api/v1/admin", createAdmin);
  app.get("/api/v1/admin", getAdmins);
  app.get("/api/v1/admin/:id", getAdminsById);
  app.put("/api/v1/admin/:id", updateAdmin);
  app.delete("/api/v1/admin/:id", deleteAdmin);
};
