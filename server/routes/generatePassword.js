const express = require("express");
const router = express.Router();
const generator = require("generate-password");

router.post("/", (req, res) => {
  const {
    length = 12,
    numbers = true,
    symbols = true,
    uppercase = true,
    lowercase = true,
    strict = true,
  } = req.body;

  const password = generator.generate({
    length,
    numbers,
    symbols,
    uppercase,
    lowercase,
    strict,
  });

  res.json({ password });
});

module.exports = router;
