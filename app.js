const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

module.exports = app;
