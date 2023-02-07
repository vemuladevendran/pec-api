const {
    adminLogin, checkTeacherEmail,
    setTeacherPassword,
    teacherLogin,
} = require("../controllers/auth/index");

module.exports = function authRoutes(app) {
    app.post("/api/v1/admin/login", adminLogin);
    app.post("/api/v1/teacher/checkemail", checkTeacherEmail);
    app.post("/api/v1/teacher/login", teacherLogin);
    app.post("/api/v1/teacher/setpassword", setTeacherPassword);
};
