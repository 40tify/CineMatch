import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// LoginPage component for CineMatch
function LoginPage({ navigate }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      navigate('home');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400 text-center">Login to CineMatch</h2>
      {error && <div className="mb-4 text-red-400 text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          className="px-4 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="px-4 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-yellow-400 text-gray-900 font-bold py-2 rounded hover:bg-yellow-300 transition"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="mt-4 text-center text-gray-400">
        Don't have an account?{' '}
        <button className="text-yellow-400 hover:underline" onClick={() => navigate('register')}>
          Register
        </button>
      </div>
      <div className="mt-2 text-center text-gray-400">
        <button className="text-yellow-400 hover:underline" onClick={() => navigate('forgotPassword')}>
          Forgot your password?
        </button>
      </div>
    </div>
  );
}

export default LoginPage; 