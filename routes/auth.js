const {
    adminLogin,
    checkTeacherEmail,
    setTeacherPassword,
    teacherLogin,
    checkStudentEmail,
    setStudentPassword,
    studentLogin,
    resetStudentPassword,
    resetStaffPassword,
} = require("../controllers/auth/index");

const { checkToken } = require("../services/auth");


module.exports = function authRoutes(app) {
    app.post("/api/v1/admin/login", adminLogin);
    app.post("/api/v1/teacher/checkemail", checkTeacherEmail);
    app.post("/api/v1/teacher/login", teacherLogin);
    app.post("/api/v1/teacher/setpassword", setTeacherPassword);
    app.post("/api/v1/student/checkemail", checkStudentEmail);
    app.post("/api/v1/student/login", studentLogin);
    app.post("/api/v1/student/setpassword", setStudentPassword);
    app.get("/api/v1/reset-password/student", checkToken, resetStudentPassword);
    app.get("/api/v1/reset-password/teacher", checkToken, resetStaffPassword);
};
