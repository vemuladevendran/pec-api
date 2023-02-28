const { markAttendance, getAttendanceReport, attendanceReports, attendanceReportByExamNumber } = require('../controllers/attendance/index');
const { checkToken } = require("../services/auth")

module.exports = function attendanceRoutes(app) {
  app.post("/api/v1/attendance",checkToken, markAttendance);
  app.get("/api/v1/attendance",checkToken, getAttendanceReport);
  app.get("/api/v1/attendance-reports", checkToken, attendanceReports);
  app.get("/api/v1/attendance/:examnumber",checkToken, attendanceReportByExamNumber);
};
