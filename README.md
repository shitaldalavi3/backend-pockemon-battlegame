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
  `npm install cors express dotenv mongoose colors `
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

### Future enhancements

## If you want to limit the number of requests a user can make to a website and block them after a certain threshold (e.g., 5 requests), you can implement rate limiting or request throttling. This ensures that users don’t abuse your server resources or overload your API.

Here are the steps to achieve this in a React JavaScript project:

- Implement Request Throttling:
  You can use a custom React Hook to track the number of requests made by a user.
  When a user makes a request, increment a counter.
  If the counter exceeds the allowed limit (e.g., 5 requests), prevent further requests.
- Example Using a Custom React Hook:
  Let’s create a simple example using a custom hook called useRequestThrottle:

```
// useRequestThrottle.js
import { useState } from 'react';

const useRequestThrottle = (maxRequests) => {
  const [requestCount, setRequestCount] = useState(0);

  const incrementRequestCount = () => {
    setRequestCount((prevCount) => prevCount + 1);
  };

  const canMakeRequest = requestCount < maxRequests;

  return { canMakeRequest, incrementRequestCount };
};

export default useRequestThrottle;


```

## Usage in Your Component:

- In your component, use the useRequestThrottle hook

```
import React from 'react';
import useRequestThrottle from './useRequestThrottle';

const MyComponent = () => {
  const { canMakeRequest, incrementRequestCount } = useRequestThrottle(5);

  const handleButtonClick = () => {
    if (canMakeRequest) {
      // Make your API request here
      // ...
      incrementRequestCount();
    } else {
      console.log('Request limit exceeded. Please try again later.');
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Make Request</button>
    </div>
  );
};

export default MyComponent;

```

- Explanation:
  The useRequestThrottle hook initializes a request counter (requestCount) and provides a function (incrementRequestCount) to increment it.
  The canMakeRequest flag indicates whether the user can make additional requests based on the threshold.
  When the user clicks a button (or performs any action that triggers a request), check if canMakeRequest is true before making the actual request.
  Adjust as Needed:
  You can customize the hook to fit your specific requirements (e.g., storing the counter in local storage, resetting it after a certain time, etc.).
