"use strict";

const {
    createPlacement,
    getPlacementDetails,
    updateStatus
} = require("../controllers/placement/index");
const { checkToken } = require("../services/auth");

module.exports = function placementRoutes(app) {
    app.post("/api/v1/placement", checkToken, createPlacement);
    app.get("/api/v1/placement", checkToken, getPlacementDetails);
    app.put("/api/v1/placement/:id", checkToken, updateStatus);
};
