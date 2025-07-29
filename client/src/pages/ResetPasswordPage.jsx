import React, { useState } from 'react';
import axios from 'axios';

// ResetPasswordPage component for CineMatch
function ResetPasswordPage({ token, navigate }) {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const res = await axios.post(
        (process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000') + '/api/auth/reset-password',
        { token, password },
        { withCredentials: true }
      );
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400 text-center">Reset Password</h2>
      {message && <div className="mb-4 text-green-400 text-center">{message}</div>}
      {error && <div className="mb-4 text-red-400 text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          className="px-4 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter new password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-yellow-400 text-gray-900 font-bold py-2 rounded hover:bg-yellow-300 transition"
          disabled={loading}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      <div className="mt-4 text-center text-gray-400">
        <button className="text-yellow-400 hover:underline" onClick={() => navigate('login')}>
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ResetPasswordPage; 