const express = require("express");
const userRoutes = require("./userRoutes");
const vehicleRoutes = require("./vehicleRoutes");

const routes = express.Router();

routes.use("/user", userRoutes);
routes.use("/vehicle", vehicleRoutes);

module.exports = routes;
