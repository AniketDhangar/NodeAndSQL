const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("AgriSoft", "root", "Aniket@0768", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
