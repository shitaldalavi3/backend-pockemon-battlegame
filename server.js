const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("colors");
const connectDB = require("./db/dbinit");
connectDB();

const leaderboardRoutes = require("./routes/leaderboardRoutes");


const port = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/leaderboard", leaderboardRoutes);


app.get("/", (req, res) => {
  res.send("welcome to the pokemon bettel game ");
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`.bgGreen.black)
);
