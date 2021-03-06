var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var vehiclesRouter = require("./routes/vehicle");
var partsRouter = require("./routes/parts");
const vehicleFavRouter = require("./routes/vehicle_fav");
const partsFavRouter = require("./routes/part_fav");
require("dotenv").config();
require("./config/database").connect();

var app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/vehicles", vehiclesRouter);
app.use("/api/parts", partsRouter);
app.use("/api/part_fav", partsFavRouter);
app.use("/api/vehicle_fav", vehicleFavRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  console.log(err.message);
  // res.status(err.message);
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
