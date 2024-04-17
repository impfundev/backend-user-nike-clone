require("dotenv").config();
require("ts-node/register");
import type { Knex } from "knex";
import { config } from "../config/config";

const environments: string[] = ["development", "test", "production"];

const connection: Knex.ConnectionConfig = {
  host: config.development.host,
  database: config.development.database,
  user: config.development.username,
  password: config.development.password,
};

const commonConfig: Knex.Config = {
  client: "mysql2",
  connection,
  migrations: {
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};

export default Object.fromEntries(
  environments.map((env: string) => [env, commonConfig])
);
