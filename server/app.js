require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const expressSession = require("express-session");
const passport = require("passport");
const passwordRoutes = require("./routes/passwords");
const passwordGenerator = require("./routes/generatePassword");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "RanDOM625r1252",
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/passwords", passwordRoutes);
app.use("/api/generatePassword", passwordGenerator);

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});

module.exports = app;
