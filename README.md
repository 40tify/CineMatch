# CineMatch: Movie Recommendation App

## Project Overview
CineMatch is a full-featured movie recommendation platform designed to help users discover, search, save, rate, and review their favorite movies. It provides personalized recommendations and allows users to manage their movie preferences through custom watchlists and a user profile.

This project is built as a full-stack application, separating the frontend and backend for scalable and maintainable development.

## Features

### User Authentication
- **User Registration & Login**: Secure user accounts.
- **Secure Password Handling**: Passwords are hashed using bcrypt.js.
- **JWT Token-Based Authentication**: Secure API access using JSON Web Tokens stored in httpOnly cookies.

### Movie Discovery
- **Search Movies**: Find movies by title, genre, or release year.
- **Filter Options**: Refine search results by rating, release date, and popularity.
- **Detailed Movie Information**: View comprehensive details for each movie, including synopsis, cast, and trailers (external links).
- **Personalized Recommendations**: Get movie suggestions based on user activity (future enhancement).

### User Features
- **Save Favorite Movies**: Mark movies as favorites for quick access.
- **Create Custom Watchlists**: Organize movies into personalized lists.
- **Rate & Review Movies**: Share opinions and ratings for movies.
- **User Profile Management**: View and update basic user information.

## Tech Stack

### Frontend
- **React.js**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development and responsive design.
- **React Context API**: For global state management (e.g., authentication status).
- **Lucide React**: For crisp, customizable SVG icons.

### Backend
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: A NoSQL document database for storing user data, favorites, watchlists, and reviews.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JSON Web Tokens (JWT)**: For secure, stateless authentication.
- **Bcrypt.js**: For hashing and salting passwords.
- **TMDB (The Movie Database) API**: External API for fetching comprehensive movie data.

## Project Structure
The project is organized into two main directories: `client` for the React frontend and `server` for the Node.js/Express backend.

```
/cine-match
├── client/                 # React Frontend
│   ├── public/             # Public assets (index.html, favicon)
│   ├── src/                # React source code
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Top-level application views/pages
│   │   ├── context/        # React Context providers
│   │   ├── api/            # Frontend API service functions
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main React application component
│   │   ├── index.js        # React entry point
│   │   └── index.css       # Tailwind CSS imports
│   ├── package.json        # Frontend dependencies and scripts
│   └── tailwind.config.js  # Tailwind CSS configuration
│
├── server/                 # Node.js/Express Backend
│   ├── config/             # Database connection setup
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express API route definitions
│   ├── controllers/        # Logic for handling API requests
│   ├── middleware/         # Custom Express middleware (e.g., authentication)
│   ├── .env.example        # Example environment variables
│   ├── server.js           # Main Express application entry point
│   └── package.json        # Backend dependencies and scripts
│
├── .gitignore              # Specifies intentionally untracked files to ignore
└── vercel.json             # Vercel deployment configuration for the frontend
```

## Getting Started (Local Development)
Follow these steps to set up and run the CineMatch application on your local machine.

### Prerequisites
- **Node.js** (>= v18.0.0 recommended)
- **npm** (comes with Node.js) or **Yarn**
- **MongoDB** (local instance or a cloud-hosted instance like MongoDB Atlas)
- **A TMDB API Key** (get one from [TMDB API](https://www.themoviedb.org/documentation/api))

### 1. Clone the Repository
```bash
git clone https://github.com/40tify/CineMatch.git
cd CineMatch
```

### 2. Backend Setup
Navigate to the `server` directory, install dependencies, and configure environment variables.

```bash
cd server
npm install # or yarn install
```

Create a `.env` file in the `server` directory and add the following environment variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=a_very_strong_random_secret_string_here
TMDB_API_KEY=your_tmdb_api_key_here
CLIENT_URL=http://localhost:3000 # For local development, this is your frontend URL
```

- **MONGO_URI**: Replace with your MongoDB connection string (e.g., from MongoDB Atlas or your local MongoDB instance).
- **JWT_SECRET**: Generate a strong, random string (e.g., using `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`).
- **TMDB_API_KEY**: Your API key from The Movie Database.

Run the backend server:

```bash
npm start # or node server.js
```

The server should start on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal, navigate to the `client` directory, install dependencies, and configure environment variables.

```bash
cd ../client # Go back to the root, then into client
npm install # or yarn install
```

Create a `.env` file in the `client` directory and add the following environment variable:

```
REACT_APP_BACKEND_URL=http://localhost:5000 # Points to your local backend
```

Run the frontend development server:

```bash
npm start # or yarn start
```

The React app should open in your browser at `http://localhost:3000`.

## Deployment
CineMatch is designed for separate frontend and backend deployments for optimal performance and scalability.

### 1. Database (MongoDB Atlas)
- **Platform**: MongoDB Atlas
- **Setup**: Create a free tier (M0 Sandbox) cluster. Configure a database user with read/write access and set up network access (ideally restricted to your backend's IP, or `0.0.0.0/0` for initial testing). Obtain your `MONGO_URI` connection string.

### 2. Backend (Render)
- **Platform**: Render
- **Service Type**: Web Service
- **Root Directory**: Set this to `server/` (crucial!)
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Environment Variables**: Configure the following in Render's dashboard:
  - `PORT` (Render will set this automatically)
  - `MONGO_URI` (from MongoDB Atlas)
  - `JWT_SECRET` (your generated secret)
  - `TMDB_API_KEY` (your TMDB API key)
  - `CLIENT_URL` (This must be the exact public URL of your deployed Vercel frontend, e.g., `https://cine-match-sigma.vercel.app`. No trailing slash!)

### 3. Frontend (Vercel)
- **Platform**: Vercel
- **Project Setup**: Import your Git repository.
- **Root Directory**: Set this to `client/`
- **Framework Preset**: Create React App (usually auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Environment Variables**: Configure the following in Vercel's dashboard:
  - `REACT_APP_BACKEND_URL` (This must be the exact public URL of your deployed Render backend, e.g., `https://cine-match-t4dr.onrender.com`)

## Continuous Deployment (CI/CD)
Both Render and Vercel offer seamless continuous deployment. Once configured, pushing new commits to your main branch (e.g., `master` or `main`) will automatically trigger a new build and deployment on both platforms.

## Troubleshooting

### Blank Frontend Page
- Check Vercel deployment logs for build errors.
- Verify `client/public/index.html` has `<div id="root"></div>` and the `react-scripts` build process correctly injects the `<script>` and `<link>` tags into the deployed `index.html` (view page source on the live site).
- Ensure `vercel.json` is correctly configured in the project root.
- Clear browser cache and perform a hard refresh (`Ctrl+Shift+R` or `Cmd+Shift+R`).

### CORS Errors (Access-Control-Allow-Origin)
- This means your backend is blocking requests from your frontend.
- Crucially, ensure the `CLIENT_URL` environment variable on Render (your backend) is set to the exact public URL of your Vercel frontend, with no trailing slash unless explicitly required by Vercel's domain format.
- Redeploy your backend after updating `CLIENT_URL`.

### Backend Errors (500, etc.)
- Check Render logs for specific error messages.
- Ensure all environment variables (`MONGO_URI`, `JWT_SECRET`, `TMDB_API_KEY`, `CLIENT_URL`) are correctly set in Render's dashboard.
- Verify MongoDB Atlas network access allows connections from your Render backend's IP or is set to `0.0.0.0/0` for testing.