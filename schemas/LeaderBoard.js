const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
    unique: true,
  },
  battles: {
    type: Number,
    default: 0,
  },
  won: {
    type: Number,
    default: 0,
  },
  lost: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Leaderboard", leaderboardSchema);
