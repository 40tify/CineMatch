import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

// Search movies
export async function searchMovies(params) {
  try {
    const res = await axios.get(`${API_URL}/api/movies/search`, { params });
    return res.data;
  } catch (err) {
    return { results: [], message: err.response?.data?.message || 'Search failed' };
  }
}

// Get movie details
export async function getMovieDetails(id) {
  try {
    const res = await axios.get(`${API_URL}/api/movies/${id}`);
    return res.data;
  } catch (err) {
    return null;
  }
}

// Get reviews for a movie
export async function getReviews(id) {
  try {
    const res = await axios.get(`${API_URL}/api/movies/${id}/reviews`);
    return res.data;
  } catch (err) {
    return [];
  }
}

// Add a review
export async function addReview(id, rating, comment) {
  try {
    const res = await axios.post(
      `${API_URL}/api/movies/${id}/reviews`,
      { rating, comment },
      { withCredentials: true }
    );
    return { success: true, review: res.data };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || 'Add review failed' };
  }
}

// Update a review
export async function updateReview(id, reviewId, rating, comment) {
  try {
    const res = await axios.put(
      `${API_URL}/api/movies/${id}/reviews/${reviewId}`,
      { rating, comment },
      { withCredentials: true }
    );
    return { success: true, review: res.data };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || 'Update review failed' };
  }
}

// Delete a review
export async function deleteReview(id, reviewId) {
  try {
    await axios.delete(`${API_URL}/api/movies/${id}/reviews/${reviewId}`, { withCredentials: true });
    return { success: true };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || 'Delete review failed' };
  }
} 