const {
    uploadSemesterMarks,
    getSemesterMarks,
    deleteMarks,
    getSemesterMarksByExamNumber
} = require("../controllers/semester-exam/index");
const { checkToken } = require("../services/auth");

module.exports = function semesterMarksRoutes(app) {
    app.post("/api/v1/semester-marks",checkToken, uploadSemesterMarks);
    app.get("/api/v1/semester-marks",checkToken, getSemesterMarks);
    app.get("/api/v1/semester-marks/student/:examNumber",checkToken, getSemesterMarksByExamNumber);
    app.delete("/api/v1/semester-marks/:id",checkToken, deleteMarks);
};
