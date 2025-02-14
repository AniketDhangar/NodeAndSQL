import sequelize from "./Database.js";
import { Sequelize, DataTypes } from "sequelize";

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
  },
  { timestamps: true }
);

export default Crop;
