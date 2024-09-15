const express = require("express");
// const router = express.Router();
// const checkAuth = require("../middleware/auth");

// // A protected route is define here
// router.get("/profile", checkAuth, (req, res) => {
//   // Access user data through req.userData
//   res.json({ message: "You are authenticated" });
// });

// module.exports = router;

const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// Route to get all scores
router.get("/", getAllUsers);

// Route to get a specific score by ID
router.get("/:id", getOneUser);

// Route to create a new score
router.post("/", createUser);

// Route to update a score by ID
router.put("/:id", updateUser);

// Route to delete a score by ID
router.delete("/:id", deleteUser);

// api.route("/user").get(getAllUsers).post(createOrUpdateUser);
// api.route("/user/:id").delete(deleteUser);

module.exports = router;
