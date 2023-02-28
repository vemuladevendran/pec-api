const {
    enterMarks,
    getMarks,
    getMarksById,
    getMarksByExamNumber
} = require("../controllers/internal-marks/index");
const { checkToken } = require("../services/auth");

module.exports = function internalMarksRoutes(app) {
    app.post("/api/v1/internal-marks",checkToken, enterMarks);
    app.get("/api/v1/internal-marks",checkToken, getMarks);
    app.get("/api/v1/internal-marks/:id",checkToken, getMarksById);
    app.get("/api/v1/internal-marks/student/:examNumber",checkToken, getMarksByExamNumber);
};
