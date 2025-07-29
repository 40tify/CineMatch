// server/config/db.js
// MongoDB connection utility using Mongoose

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Deprecated options removed as of Mongoose 6+
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB; 