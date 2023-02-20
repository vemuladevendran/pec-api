const {
    adminProfile,
    studentProfile,
    teacherProfile
} = require("../controllers/profile/index");
const { checkToken } = require("../services/auth");

module.exports = function profileRoutes(app) {
    app.get("/api/v1/profile/admin", checkToken, adminProfile);
    app.get("/api/v1/profile/teacher", checkToken, teacherProfile);
    app.get("/api/v1/profile/student", checkToken, studentProfile);
};
