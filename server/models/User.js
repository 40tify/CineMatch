// server/models/User.js
// User model for CineMatch

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Watchlist subdocument schema
const watchlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  movieIds: [{ type: Number }], // Array of TMDB movie IDs
}, { _id: true });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 32,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /.+\@.+\..+/, // Basic email validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  watchlists: [watchlistSchema], // Array of watchlists
  // Password reset fields
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema); 