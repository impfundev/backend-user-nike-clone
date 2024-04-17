"use strict";

import { Sequelize } from "sequelize";
import { config } from "../config/config";

const option = config.development;
export const sequelize = new Sequelize(
  option.database,
  option.username,
  option.password,
  {
    host: option.host,
    dialect: "mysql",
  }
);
