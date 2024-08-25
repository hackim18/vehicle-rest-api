require("dotenv").config();
const express = require("express");
const errorHandlers = require("./middlewares/errorHandlers");
const routes = require("./routes");

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Vehicle REST API" });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(errorHandlers);

module.exports = app;
