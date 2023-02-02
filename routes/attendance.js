const { markAttendance, getAttendanceReport } = require('../controllers/attendance/index');


module.exports = function attendanceRoutes(app) {
  app.post("/api/v1/attendance", markAttendance);
  app.get("/api/v1/attendance", getAttendanceReport);
};
