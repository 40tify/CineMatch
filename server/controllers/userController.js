// server/controllers/userController.js
// User controller for CineMatch (profile, favorites, watchlists)

const User = require('../models/User');
const Movie = require('../models/Movie');
const mongoose = require('mongoose');

// Get authenticated user's profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Update user's username or email
exports.updateProfile = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const update = {};
    if (username) update.username = username;
    if (email) update.email = email;
    const user = await User.findByIdAndUpdate(req.user.id, update, { new: true, runValidators: true }).select('-password');
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Get all favorited movie IDs for the user
exports.getFavorites = async (req, res, next) => {
  try {
    const movies = await Movie.find({ favoritedBy: req.user.id }).select('movieId');
    res.json(movies.map(m => m.movieId));
  } catch (err) {
    next(err);
  }
};

// Add a movie to favorites
exports.addFavorite = async (req, res, next) => {
  try {
    const { movieId } = req.body;
    if (!movieId) return res.status(400).json({ message: 'movieId is required.' });
    let movie = await Movie.findOne({ movieId });
    if (!movie) {
      movie = new Movie({ movieId, favoritedBy: [req.user.id] });
    } else if (!movie.favoritedBy.includes(req.user.id)) {
      movie.favoritedBy.push(req.user.id);
    }
    await movie.save();
    res.json({ message: 'Added to favorites.' });
  } catch (err) {
    next(err);
  }
};

// Remove a movie from favorites
exports.removeFavorite = async (req, res, next) => {
  try {
    const { id: movieId } = req.params;
    const movie = await Movie.findOne({ movieId });
    if (!movie) return res.status(404).json({ message: 'Movie not found.' });
    movie.favoritedBy = movie.favoritedBy.filter(uid => uid.toString() !== req.user.id);
    await movie.save();
    res.json({ message: 'Removed from favorites.' });
  } catch (err) {
    next(err);
  }
};

// Watchlists: Each user can have multiple watchlists
// We'll store watchlists as a subdocument array in User for simplicity

// Get all watchlists for the user
exports.getWatchlists = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.watchlists || []);
  } catch (err) {
    next(err);
  }
};

// Create a new watchlist
exports.createWatchlist = async (req, res, next) => {
  try {
    const { name, description, movieIds } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required.' });
    const user = await User.findById(req.user.id);
    const newWatchlist = {
      _id: new mongoose.Types.ObjectId(),
      name,
      description: description || '',
      movieIds: movieIds || [],
    };
    user.watchlists = user.watchlists || [];
    user.watchlists.push(newWatchlist);
    await user.save();
    res.status(201).json(newWatchlist);
  } catch (err) {
    next(err);
  }
};

// Update a watchlist
exports.updateWatchlist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, movieIds } = req.body;
    const user = await User.findById(req.user.id);
    const wl = user.watchlists.id(id);
    if (!wl) return res.status(404).json({ message: 'Watchlist not found.' });
    if (name) wl.name = name;
    if (description) wl.description = description;
    if (movieIds) wl.movieIds = movieIds;
    await user.save();
    res.json(wl);
  } catch (err) {
    next(err);
  }
};

// Delete a watchlist
exports.deleteWatchlist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.id);
    user.watchlists.id(id).remove();
    await user.save();
    res.json({ message: 'Watchlist deleted.' });
  } catch (err) {
    next(err);
  }
}; 