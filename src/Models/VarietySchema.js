const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./Database.js");
const Crop = require("./CropSchema.js"); 

const Variety = sequelize.define(
  "VarietyTable",
  {
    varietyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    varietyCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    varietyGender: {
      type: DataTypes.ENUM("Male", "Female"),
      allowNull: false,
    },
    varietyDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    varietyMaleImgOne: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    varietyMaleImgTwo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    varietyMaleImgThree: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    varietyFemaleImgOne: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    varietyFemaleImgTwo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    varietyFemaleImgThree: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    cropId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Crop, // Foreign key relation with CropTable
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  { timestamps: true }
);

module.exports = Variety;
