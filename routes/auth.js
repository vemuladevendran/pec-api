const {
    adminLogin
} = require("../controllers/auth/index");

module.exports = function authRoutes(app) {
    app.post("/api/v1/admin/login", adminLogin);
};
