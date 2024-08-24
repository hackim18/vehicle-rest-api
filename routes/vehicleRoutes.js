const express = require("express");

const vehicleRoutes = express.Router();

vehicleRoutes.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

module.exports = vehicleRoutes;
