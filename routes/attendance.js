const {markAttendance} = require('../controllers/attendance/index');


module.exports = function attendanceRoutes(app) {
    app.post("/api/v1/attendance", markAttendance);
  };
   