// server/models/Movie.js
// Movie model for CineMatch (stores TMDB movieId and user references)

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movieId: {
    type: Number, // TMDB movie ID
    required: true,
    unique: true,
  },
  favoritedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  watchlistedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

module.exports = mongoose.model('Movie', movieSchema); 