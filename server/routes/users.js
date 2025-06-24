const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username });

  User.register(newUser, password)
    .then((registeredUser) => {
      passport.authenticate("local")(req, res, () => {
        res
          .status(200)
          .json({ message: "Signup successful", user: registeredUser });
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Signup failed", error: err.message });
    });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: "Invalid Credentials" });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.status(200).json({ message: "Logged out successfully" });
  });
});

module.exports = router;
