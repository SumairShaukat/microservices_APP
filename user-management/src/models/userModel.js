import { DataTypes, UUIDV4 } from "sequelize";
const User = sequelize.define("User", {
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

  passport: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: { type: DataTypes.STRING, allowNull: true },
  provider: { type: DataTypes.ENUM("local", "google", "apple") },
});

export default User;
