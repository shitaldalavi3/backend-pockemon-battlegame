const Leaderboard = require("../schemas/Leaderboard");

/// Get all leaderboard scores
const getAllScores = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ score: -1 }).limit(10);
    if (!leaderboard.length) {
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

// Create a new leaderboard entry or update an existing player's stats
const createScore = async (req, res) => {
  try {
    const { username, score, battles, won, lost } = req.body;

    if (!username || score == null) {
      return res
        .status(400)
        .json({ message: "Username and score are required" });
    }

    // Check if the player exists and update their stats
    let player = await Leaderboard.findOne({ username });
    if (player) {
      player.score += score; // Add the new score to the player's existing score
      player.battles += battles || 0; // Increment battles, if provided
      player.won += won || 0; // Increment won, if provided
      player.lost += lost || 0; // Increment lost, if provided
    } else {
      player = new Leaderboard({
        username,
        score,
        battles: battles || 0,
        won: won || 0,
        lost: lost || 0,
      });
    }

    const savedScore = await player.save();
    return res.status(201).json(savedScore);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Update an existing leaderboard entry by ID
const updateScore = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, score, battles, won, lost } = req.body;

    const updatedScore = await Leaderboard.findByIdAndUpdate(
      id,
      {
        username,
        score,
        battles,
        won,
        lost,
      },
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
const createOrUpdateUser = async (req, res) => {
  //game result will be lose or win based on how the game goes and that will be sent to backend with username
  const { username, gameResult } = req.body;
  let win = 0;
  let lose = 0;

  if (gameResult === "won") {
    win = 1;
  } else if (gameResult === "lost") {
    lose = 1;
  } else {
    res
      .status(400)
      .json({ message: "Something went wrong. Invalid game result" });
  }

  try {
    //find user and update. If gameResult is "win", than win = 1, else if gameResult is "lost" than lose = 1
    //$inc increments a field by a specified value.
    //upsert creates a document with the requirements if it doesnt already exist
    const user = await Leaderboard.findOneAndUpdate(
      { username },
      { $inc: { won: win, lost: lose, battles: 1 } },
      { new: true, upsert: true }
    );
    res.status(200).json({ message: "User successfully updated", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Leaderboard.find();
    if (!users.length) {
      return res.status(404).json({ message: "No users found in database" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Leaderboard.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ message: "Sorry, I coudlnt find this user" });
    } else {
      res.status(200).json({ message: "User successfullly deleted" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllScores,
  getOneScore,
  createScore,
  updateScore,
  deleteScore,
  createOrUpdateUser,
  getAllUsers,
  deleteUser,
};
