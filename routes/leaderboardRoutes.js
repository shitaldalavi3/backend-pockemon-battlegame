const express = require("express");
const {
  getAllScores,
  getOneScore,
  createScore,
  updateScore,
  deleteScore,
  getAllUsers,
  createOrUpdateUser,
  deleteUser,
} = require("../controllers/leaderboardController");

const router = express.Router();

// Route to get all scores
router.get("/", getAllScores);

// Route to get a specific score by ID
router.get("/:id", getOneScore);

// Route to create a new score
router.post("/", createScore);

// Route to update a score by ID
router.put("/:id", updateScore);

// Route to delete a score by ID
router.delete("/:id", deleteScore);

api.route("/user").get(getAllUsers).post(createOrUpdateUser);
api.route("/user/:id").delete(deleteUser);

module.exports = router;
