const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sqlite = require("sqlite3");
const env = require("dotenv").load();
const port = process.env.PORT || 8080;

const models = require("./models");
const books = require("./routes/books");

models.sequelize
  .sync()
  .then(function () {
    console.log("connected to database");
  })
  .catch(function (err) {
    console.log(err);
  });

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/books", books);

app.get("/", function (req, res) {
  console.log("app listening on port: " + port);
  res.send("tes express nodejs sqlite");
});

app.listen(port, function () {
  console.log("app listening on port: " + port);
});

module.exports = app;
