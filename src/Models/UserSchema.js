const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./Database.js");

const User = sequelize.define(
  "UserTable",
  {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userMobile: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isBlock: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

console.log(User === sequelize.models.UserTable);

module.exports = User;
