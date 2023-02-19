const {
    adminLogin,
    checkTeacherEmail,
    setTeacherPassword,
    teacherLogin,
    checkStudentEmail,
    setStudentPassword,
    studentLogin,
} = require("../controllers/auth/index");

module.exports = function authRoutes(app) {
    app.post("/api/v1/admin/login", adminLogin);
    app.post("/api/v1/teacher/checkemail", checkTeacherEmail);
    app.post("/api/v1/teacher/login", teacherLogin);
    app.post("/api/v1/teacher/setpassword", setTeacherPassword);
    app.post("/api/v1/student/checkemail", checkStudentEmail);
    app.post("/api/v1/student/login", studentLogin);
    app.post("/api/v1/student/setpassword", setStudentPassword);
};
