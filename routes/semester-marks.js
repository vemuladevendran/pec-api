const {
    uploadSemesterMarks,
    getSemesterMarks,
    deleteMarks,
    getSemesterMarksByExamNumber
} = require("../controllers/semester-exam/index");

module.exports = function semesterMarksRoutes(app) {
    app.post("/api/v1/semester-marks", uploadSemesterMarks);
    app.get("/api/v1/semester-marks", getSemesterMarks);
    app.get("/api/v1/semester-marks/student/:examNumber", getSemesterMarksByExamNumber);
    app.delete("/api/v1/semester-marks/:id", deleteMarks);
};
