import { Model, DataTypes } from "sequelize";
import { sequelize } from ".";

import { randomUUID } from "crypto";
const genID = randomUUID();

class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: genID,
      primaryKey: true,
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roles: {
      type: DataTypes.STRING,
      defaultValue: "User", // "User" || "Admin"
    },
    picture: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

export default User;
