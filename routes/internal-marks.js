const {
    enterMarks,
    getMarks,
    getMarksById,
    getMarksByExamNumber
} = require("../controllers/internal-marks/index");

module.exports = function internalMarksRoutes(app) {
    app.post("/api/v1/internal-marks", enterMarks);
    app.get("/api/v1/internal-marks", getMarks);
    app.get("/api/v1/internal-marks/:id", getMarksById);
    app.get("/api/v1/internal-marks/student/:examNumber", getMarksByExamNumber);
};
