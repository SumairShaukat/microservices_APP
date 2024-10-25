import { DataTypes, UUIDV4 , Sequelize} from "sequelize";

const sequelize = new Sequelize('sqlite::memory:');
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
