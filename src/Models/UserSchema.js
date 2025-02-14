import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./Database.js";

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
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },userIsBlock:{
      type: DataTypes.BOOLEAN,
      defaultValue:false

    }
  },
  {
    timestamps: true,
  }
);
console.log(User === sequelize.models.UserTable); 
export default User;
