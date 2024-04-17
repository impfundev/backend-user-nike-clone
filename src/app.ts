import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import { notFound, errorHandler } from "./middlewares/error.middleware";
import routes from "./routes";
import MessageResponse from "./interfaces/MessageResponse";
import { sequelize } from "./models";

require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect Database
sequelize
  .authenticate()
  .then(() => {
    console.log("database connection has been established successfully");
  })
  .catch((error) => {
    console.log("connection error", error);
  });

app.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "Selamat Datang!",
  });
});

// Use all API routes
app.use("/", routes);

// Error Handlings
app.use(notFound);
app.use(errorHandler);

export default app;
