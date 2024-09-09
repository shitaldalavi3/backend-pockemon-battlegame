# FullStack-Pockemon-BattleGame

## first create basic folder structure for Backend-Pockemon-BattleGame \

Backend-Pockemon-BattleGame
│
├── db
│ └── dbinit.js
│
├── leaderboardController.js
│
├── routers
│ └── leaderboardRouter.js
│
├── schemas
│ └── LeaderBoard.js
│
└── server.js

## install depenencies

- install npm init -y it will create package.json file
- install other depenencies which is required for backend development \
  `npm install cloudinary cors express mongoose  multer multer-storage-cloudinary nodemon colors `
  - "dependencies":
    Lists the external packages (dependencies) required for your project to run.
    Let’s break down the dependencies:
  - "cloudinary": "^1.41.3":
    Used for working with Cloudinary, a cloud-based image and video management service.
  - "cors": "^2.8.5":
    Enables Cross-Origin Resource Sharing (CORS) for handling requests from different origins.
  - "dotenv": "^16.4.5":
    Loads environment variables from a .env file into your application.
  - "express": "^4.19.2":
    The core framework for building your API.
  - "mongoose": "^8.6.1":
    An ODM (Object Data Modeling) library for MongoDB, allowing you to define schemas and interact with the database.
  - "multer": "^1.4.5-lts.1":
    Middleware for handling file uploads (used for images, etc.).
  - "multer-storage-cloudinary": "^4.0.0":
    Integrates Multer with Cloudinary for storing uploaded files.
  - "nodemon": "^3.1.4":
    Automatically restarts your server during development when files change.
  - "devDependencies":
    Lists development-specific dependencies (not needed in production).
  - "colors": "^1.4.0":
    Adds color to console logs during development (helpful for debugging).

## most important step create .env and .gitignore file

.env File includes PORT and MONGOURL
.gitignore File includes `.env` and `/node_modules`
add MONGOURL and PORT into `.env` file
