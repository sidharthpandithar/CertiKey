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
    const userId = req.user._id;

    const passwords = await Passwords.find({ data_owner: userId });

    res.status(200).json(passwords);
  } catch (err) {
    console.error("Fetch error:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch passwords", error: err.message });
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
