require("dotenv").config();
require("./db/Clients");
const cors = require("cors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/errorHandler");

const authRouter = require("./routes/authRouter");

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
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);
app.get("/favicon.ico", (req, res) => res.status(204).send("no content"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

//use this middleware to serve static files when the route is prefixed with /public
app.use("/public/images/", express.static(__dirname + "/public/images"));

app.use("/auth", authRouter);
app.use(errorHandler);

module.exports = app;
