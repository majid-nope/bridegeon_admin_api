const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const mongodb = require("./lib/db");
const cors = require("cors");

const app = express();

const userRouter = require("./routes/users");

require("dotenv").config();
//connecting  mongodb

mongodb.connect();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", userRouter);
module.exports = app;
