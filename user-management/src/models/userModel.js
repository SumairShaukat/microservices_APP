import { DataTypes, UUIDV4 , } from "sequelize";
import sequelize from "../config/dbConfig.js";
// const sequelize = new Sequelize('postgres://postgres:1122@localhost:5432/user_management');
const User =  sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: { type: DataTypes.STRING, allowNull: true },
  provider: { type: DataTypes.ENUM("local", "google", "apple") },
});

export default User;
