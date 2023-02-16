const {
    uploadSemesterMarks,
    getSemesterMarks,
    deleteMarks
} = require("../controllers/semester-exam/index");

module.exports = function semesterMarksRoutes(app) {
    app.post("/api/v1/semester-marks", uploadSemesterMarks);
    app.get("/api/v1/semester-marks", getSemesterMarks);
    app.delete("/api/v1/semester-marks/:id", deleteMarks);
};
