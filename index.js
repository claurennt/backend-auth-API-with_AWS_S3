import "dotenv/config.js";
import express from "express";

import "./db/Client.js";
import cors from "cors";

import path from "path";
// import cookieParser from "cookie-parser";
import logger from "morgan";
import helmet from "helmet";
import errorHandler from "./middlewares/errorHandler.js";
import bodyParser from "body-parser";

import usersRouter from "./routes/usersRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(
  cors({
    exposedHeaders: "x-authorization-token",
  })
);
const __dirname = path.resolve();
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);
app.get("/favicon.ico", (req, res) => res.status(204).send("no content"));

// view engine setup

app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use(errorHandler);

export default app;
