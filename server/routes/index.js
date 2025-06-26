var express = require("express");
const passport = require("passport");
var router = express.Router();
const userModel = require("../models/User");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

router.post("/signup", function (req, res) {
  var userdata = new userModel({
    username: req.body.username,
    secret: req.body.secret,
  });
  userModel
    .register(userdata, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        res
          .status(200)
          .json({ message: "Signup successful", user: registereduser });
      });
    })
    .catch(function (err) {
      res.status(500).json({ message: "Signup failed", error: err.message });
    });
});

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    req.logIn(user, function (err) {
      if (err) return next(err);
      return res.status(200).json({ message: "Login successful", user: user });
    });
  })(req, res, next);
});

router.get("/logout", isLoggedIn, function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: "Logged out successfully" });
    req.session.destroy();
  });
});

router.get("/ping", (req, res) => {
   res.status(200).json({ status: "ok", msg: "🟢 Keepalive" });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "User not authenticated" });
}
module.exports = router;
