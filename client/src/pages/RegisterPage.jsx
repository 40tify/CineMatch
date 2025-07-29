import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// RegisterPage component for CineMatch
function RegisterPage({ navigate }) {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    const res = await register(username, email, password);
    setLoading(false);
    if (res.success) {
      setSuccess('Registration successful! Please log in.');
      setTimeout(() => navigate('login'), 1500);
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400 text-center">Register for CineMatch</h2>
      {error && <div className="mb-4 text-red-400 text-center">{error}</div>}
      {success && <div className="mb-4 text-green-400 text-center">{success}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          className="px-4 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
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
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <div className="mt-4 text-center text-gray-400">
        Already have an account?{' '}
        <button className="text-yellow-400 hover:underline" onClick={() => navigate('login')}>
          Login
        </button>
      </div>
    </div>
  );
}

export default RegisterPage; 