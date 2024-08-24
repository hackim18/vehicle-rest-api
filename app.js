require("dotenv").config();
const express = require("express");
const vehicleRoutes = require("./routes/vehicleRoutes");
const errorHandlers = require("./middlewares/errorHandlers");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/vehicle", vehicleRoutes);
app.use("/user", userRoutes);
app.use(errorHandlers);

module.exports = app;
