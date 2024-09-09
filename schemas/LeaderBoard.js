import mongoose from "mongoose"; //ES6 declaration
import Joi from "joi";

const leaderBoardSchema = new mongoose.Schema({
  username: Joi.string().min(3).max(30).required(),
  score: Joi.number.required(),
  date: {
    type: Date,
    default: Date.now, // Set the default value to the current timestamp
  },
});

module.exports = mongoose.model(leaderBoardSchema);
