// server/routes/userRoutes.js
// User routes for CineMatch (profile, favorites, watchlists)

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

// Profile
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);

// Favorites
router.get('/favorites', auth, userController.getFavorites);
router.post('/favorites', auth, userController.addFavorite);
router.delete('/favorites/:id', auth, userController.removeFavorite);

// Watchlists
router.get('/watchlists', auth, userController.getWatchlists);
router.post('/watchlists', auth, userController.createWatchlist);
router.put('/watchlists/:id', auth, userController.updateWatchlist);
router.delete('/watchlists/:id', auth, userController.deleteWatchlist);

module.exports = router; 