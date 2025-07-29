import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

// Get user profile
export async function getProfile() {
  try {
    const res = await axios.get(`${API_URL}/api/users/profile`, { withCredentials: true });
    return res.data;
  } catch (err) {
    return null;
  }
}

// Update user profile
export async function updateProfile(data) {
  try {
    const res = await axios.put(`${API_URL}/api/users/profile`, data, { withCredentials: true });
    return { success: true, user: res.data };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || 'Update failed' };
  }
}

// Get favorites
export async function getFavorites() {
  try {
    const res = await axios.get(`${API_URL}/api/users/favorites`, { withCredentials: true });
    return res.data;
  } catch (err) {
    return [];
  }
}

// Add favorite
export async function addFavorite(movieId) {
  try {
    const res = await axios.post(`${API_URL}/api/users/favorites`, { movieId }, { withCredentials: true });
    return { success: true, message: res.data.message };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || 'Add favorite failed' };
  }
}

// Remove favorite
export async function removeFavorite(movieId) {
  try {
    const res = await axios.delete(`${API_URL}/api/users/favorites/${movieId}`, { withCredentials: true });
    return { success: true, message: res.data.message };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || 'Remove favorite failed' };
  }
}

// Get watchlists
export async function getWatchlists() {
  try {
    const res = await axios.get(`${API_URL}/api/users/watchlists`, { withCredentials: true });
    return res.data;
  } catch (err) {
    return [];
  }
}

// Create watchlist
export async function createWatchlist(data) {
  try {
    const res = await axios.post(`${API_URL}/api/users/watchlists`, data, { withCredentials: true });
    return { success: true, watchlist: res.data };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || 'Create watchlist failed' };
  }
}

// Update watchlist
export async function updateWatchlist(id, data) {
  try {
    const res = await axios.put(`${API_URL}/api/users/watchlists/${id}`, data, { withCredentials: true });
    return { success: true, watchlist: res.data };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || 'Update watchlist failed' };
  }
}

// Delete watchlist
export async function deleteWatchlist(id) {
  try {
    const res = await axios.delete(`${API_URL}/api/users/watchlists/${id}`, { withCredentials: true });
    return { success: true, message: res.data.message };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || 'Delete watchlist failed' };
  }
} 