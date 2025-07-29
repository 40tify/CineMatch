// server/routes/movieRoutes.js
// Movie routes for CineMatch (TMDB proxy, reviews)

const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const auth = require('../middleware/authMiddleware');

// Search movies (proxy to TMDB)
router.get('/search', movieController.searchMovies);
// Get movie details
router.get('/:id', movieController.getMovieDetails);

// Reviews
router.get('/:id/reviews', movieController.getReviews);
router.post('/:id/reviews', auth, movieController.addReview);
router.put('/:id/reviews/:reviewId', auth, movieController.updateReview);
router.delete('/:id/reviews/:reviewId', auth, movieController.deleteReview);

module.exports = router; 