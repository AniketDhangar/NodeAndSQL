import sequelize from "./Database.js";
import { Sequelize, DataTypes } from "sequelize";
import Crop from "./CropSchema.js"; // Ensure this is imported first

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

    // Image Fields (Allow NULL to prevent errors)
    varietyMaleImgOne: {
      type: DataTypes.STRING,
      allowNull: true, // Changed from false
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
      onDelete: "CASCADE", // Ensures varieties are deleted if crop is removed
    },
  },
  { timestamps: true }
);

export default Variety;
