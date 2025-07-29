// server/controllers/movieController.js
// Movie controller for CineMatch (TMDB proxy, reviews)

const fetch = require('node-fetch');
const Review = require('../models/Review');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE = 'https://api.themoviedb.org/3';

// Helper: fetch from TMDB
async function fetchTMDB(endpoint, params = {}) {
  const url = new URL(`${TMDB_BASE}${endpoint}`);
  url.searchParams.set('api_key', TMDB_API_KEY);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('TMDB API error');
  return res.json();
}

// Proxy search to TMDB
exports.searchMovies = async (req, res, next) => {
  try {
    const { q, genre, year, page, sort } = req.query;
    let endpoint = '/search/movie';
    let params = { query: q, page: page || 1 };
    if (!q) {
      endpoint = '/discover/movie';
      params = { with_genres: genre, primary_release_year: year, sort_by: sort, page: page || 1 };
    }
    const data = await fetchTMDB(endpoint, params);
    // Sanitize response (only send needed fields)
    const results = (data.results || []).map(m => ({
      id: m.id,
      title: m.title,
      poster_path: m.poster_path,
      release_date: m.release_date,
      overview: m.overview,
      vote_average: m.vote_average,
      genre_ids: m.genre_ids,
    }));
    res.json({ page: data.page, total_pages: data.total_pages, results });
  } catch (err) {
    next(err);
  }
};

// Get movie details from TMDB
exports.getMovieDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await fetchTMDB(`/movie/${id}`, { append_to_response: 'credits,videos' });
    // Sanitize response
    res.json({
      id: movie.id,
      title: movie.title,
      original_title: movie.original_title,
      release_date: movie.release_date,
      genres: movie.genres,
      overview: movie.overview,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      credits: movie.credits,
      videos: movie.videos,
    });
  } catch (err) {
    next(err);
  }
};

// Get all reviews for a movie
exports.getReviews = async (req, res, next) => {
  try {
    const { id: movieId } = req.params;
    const reviews = await Review.find({ movieId }).populate('user', 'username');
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

// Add a review
exports.addReview = async (req, res, next) => {
  try {
    const { id: movieId } = req.params;
    const { rating, comment } = req.body;
    if (!rating) return res.status(400).json({ message: 'Rating is required.' });
    const review = new Review({
      user: req.user.id,
      movieId,
      rating,
      comment,
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

// Update a review (only by owner)
exports.updateReview = async (req, res, next) => {
  try {
    const { id: movieId, reviewId } = req.params;
    const { rating, comment } = req.body;
    const review = await Review.findOne({ _id: reviewId, movieId, user: req.user.id });
    if (!review) return res.status(404).json({ message: 'Review not found.' });
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;
    await review.save();
    res.json(review);
  } catch (err) {
    next(err);
  }
};

// Delete a review (only by owner)
exports.deleteReview = async (req, res, next) => {
  try {
    const { id: movieId, reviewId } = req.params;
    const review = await Review.findOneAndDelete({ _id: reviewId, movieId, user: req.user.id });
    if (!review) return res.status(404).json({ message: 'Review not found.' });
    res.json({ message: 'Review deleted.' });
  } catch (err) {
    next(err);
  }
}; 