const { markAttendance, getAttendanceReport, attendanceReports, attendanceReportByExamNumber } = require('../controllers/attendance/index');
const { checkToken } = require("../services/auth")

module.exports = function attendanceRoutes(app) {
  app.post("/api/v1/attendance", markAttendance);
  app.get("/api/v1/attendance", getAttendanceReport);
  app.get("/api/v1/attendance-reports", checkToken, attendanceReports);
  app.get("/api/v1/attendance/:examnumber", attendanceReportByExamNumber);
};
