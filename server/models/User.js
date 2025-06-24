const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: String,
  savedPasswords: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Passwords",
      default: null,
    },
  ],
});

usersSchema.plugin(plm);

module.exports = mongoose.model("User", usersSchema);
