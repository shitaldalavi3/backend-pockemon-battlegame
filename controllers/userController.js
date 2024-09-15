const User = require("../schemas/User");
// const jwt = require("jsonwebtoken");

// const createToken = (_id) => {
//   return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
// };

// // login user
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.login(email, password);

//     //create token
//     const token = createToken(user._id);

//     res.status(200).json({ email, token });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // register user
// const registerUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.signup(email, password);
//     //create token
//     const token = createToken(user._id);
//     res.status(200).json({ email, token });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
// const User = require("../schemas/User");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users.length) {
      return res
        .status(200)
        .json({ message: "No users found in the database" });
    } else {
      return res.status(200).json(users);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Get one user by ID
const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });

    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Update an existing user by ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ msg: "user updated successfully", updatedUser });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res
        .status(200)
        .json({ message: "User deleted successfully", deletedUser });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
