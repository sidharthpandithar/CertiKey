const express = require("express");
const router = express.Router();
const Passwords = require("../models/passwords");

router.post("/", async (req, res) => {
  try {
    const { site, username, password } = req.body;

    const userId = req.user?._id;

    console.log("Logged-in user ID:", userId);

    const setPassword = new Passwords({
      site,
      username,
      password,
      data_owner: userId,
    });

    await setPassword.save();
    res.status(201).json(setPassword);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to Save Password", error: err.message });
  }
});

router.get("/viewPasswords", async (req, res) => {
  try {
    console.log("Session:", req.session);
    console.log("User:", req.user);

    if (!req.isAuthenticated() || !req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const passwords = await Passwords.find({ data_owner: req.user._id });
    res.json(passwords);
  } catch (err) {
    console.error("viewPasswords error:", err); // ✅ You'll see this in terminal
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

router.delete("/deletePassword/:id", async (req, res) => {
  try {
    const deleted = await Passwords.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Password not found" });
    }
    res.status(200).json({ message: "Password deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
module.exports = router;
