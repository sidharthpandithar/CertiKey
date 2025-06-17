const mongoose = require("mongoose");

const passwordsSchema = new mongoose.Schema({
  data_owner: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  ],
  site: String,
  username: String,
  password: String,
});

module.exports = mongoose.model("Passwords", passwordsSchema);
