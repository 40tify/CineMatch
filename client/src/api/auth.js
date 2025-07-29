import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

// Register a new user
export async function register(username, email, password) {
  try {
    const res = await axios.post(
      `${API_URL}/api/auth/register`,
      { username, email, password },
      { withCredentials: true }
    );
    return { success: true, message: res.data.message };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || 'Registration failed',
    };
  }
}

// Login user
export async function login(email, password) {
  try {
    const res = await axios.post(
      `${API_URL}/api/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    return {
      success: true,
      user: res.data.user,
      message: res.data.message,
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || 'Login failed',
    };
  }
}

// Logout user
export async function logout() {
  try {
    await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
    return { success: true };
  } catch (err) {
    return { success: false };
  }
} 