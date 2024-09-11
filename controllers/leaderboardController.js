const Leaderboard = require("../schemas/Leaderboard");

// Get all leaderboard scores

const getAllScores = async (req, res) => {
  console.log("start of getall");
  try {
    const leaderboard = await Leaderboard.find().sort({ score: -1 }).limit(10);
    if (!leaderboard.length) {
      console.log("check length of lb ");
      return res
        .status(200)
        .json({ message: "No scores found in the leaderboard" });
    }
    return res.status(200).json(leaderboard);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Get one leaderboard entry by ID
const getOneScore = async (req, res) => {
  try {
    const { id } = req.params;
    const scoreEntry = await Leaderboard.findById(id);
    if (!scoreEntry) {
      return res.status(404).json({ message: "Score entry not found" });
    }
    return res.status(200).json(scoreEntry);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Create a new leaderboard entry
const createScore = async (req, res) => {
  try {
    const { username, score } = req.body;
    if (!username || score == null) {
      return res
        .status(400)
        .json({ message: "Username and score are required" });
    }

    const newScore = new Leaderboard({ username, score });
    const savedScore = await newScore.save();

    return res.status(201).json(savedScore);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Update an existing leaderboard entry by ID
const updateScore = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, score } = req.body;

    const updatedScore = await Leaderboard.findByIdAndUpdate(
      id,
      { username, score },
      { new: true }
    );

    if (!updatedScore) {
      return res.status(404).json({ message: "Score entry not found" });
    }

    return res.status(200).json(updatedScore);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Delete a leaderboard entry by ID
const deleteScore = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedScore = await Leaderboard.findByIdAndDelete(id);

    if (!deletedScore) {
      return res.status(404).json({ message: "Score entry not found" });
    }

    return res
      .status(200)
      .json({ message: "Score entry deleted successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getAllScores,
  getOneScore,
  createScore,
  updateScore,
  deleteScore,
};
