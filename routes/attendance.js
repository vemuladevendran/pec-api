const { markAttendance, getAttendanceReport, attendanceReports, attendanceReportByExamNumber } = require('../controllers/attendance/index');
const { verifyToken } = require("../services/auth")

module.exports = function attendanceRoutes(app) {
  app.post("/api/v1/attendance", markAttendance);
  app.get("/api/v1/attendance", getAttendanceReport);
  app.get("/api/v1/attendance-reports", verifyToken, attendanceReports);
  app.get("/api/v1/attendance/:examnumber", attendanceReportByExamNumber);
};
