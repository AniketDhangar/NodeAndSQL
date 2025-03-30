const sequelize = require("./Database");
const { Sequelize, DataTypes } = require("sequelize");

const Crop = sequelize.define(
  "CropTable",
  {
    cropName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cropCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cropGroup: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);

module.exports = Crop;
