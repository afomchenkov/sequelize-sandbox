// const sequelize = new Sequelize("example", "root", "", {
//   host: "localhost",
//   dialect: "sqlite",
//   operatorsAliases: false,
//   // SQLite database path
//   storage: "./data/database.sqlite",
// });

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "config", "config.json"))[
  env
];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== "index.js";
  })
  .forEach((file) => {
    // var model = sequelize.import(path.join(__dirname, file));
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
