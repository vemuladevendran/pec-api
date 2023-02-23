const {
    mentiesList
} = require("../controllers/menties/index");
const { checkToken } = require("../services/auth");

module.exports = function mentiesRoutes(app) {
    app.get("/api/v1/menties", checkToken, mentiesList);
};
