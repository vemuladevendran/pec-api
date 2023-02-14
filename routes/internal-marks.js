const {
    enterMarks,
    getMarks,
    getMarksById
} = require("../controllers/internal-marks/index");

module.exports = function internalMarksRoutes(app) {
    app.post("/api/v1/internal-marks", enterMarks);
    app.get("/api/v1/internal-marks", getMarks);
    app.get("/api/v1/internal-marks/:id", getMarksById);
};
