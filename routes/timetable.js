const { createTimeTable,getTimeTables } = require('../controllers/timetable/index');


module.exports = function timeTableRoutes(app) {
    app.get("/api/v1/time-table", getTimeTables);
    app.post("/api/v1/time-table", createTimeTable);
};
