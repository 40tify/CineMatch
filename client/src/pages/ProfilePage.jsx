import React, { useEffect, useState, useContext } from 'react';
import { getProfile, updateProfile } from '../api/users';
import { AuthContext } from '../context/AuthContext';

// ProfilePage component for CineMatch
function ProfilePage({ navigate }) {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ username: '', email: '' });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch profile
  useEffect(() => {
    async function fetchProfile() {
      const data = await getProfile();
      setProfile(data);
      setForm({ username: data?.username || '', email: data?.email || '' });
    }
    if (user) fetchProfile();
  }, [user]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateProfile(form);
    if (res.success) {
      setProfile(res.user);
      setEditing(false);
      setMessage('Profile updated!');
    } else {
      setMessage(res.message);
    }
  };

  if (!user) {
    return <div className="text-center text-red-400 mt-8">You must be logged in to view your profile.</div>;
  }
  if (!profile) return <div className="text-center text-gray-400 mt-8">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400 text-center">My Profile</h2>
      {message && <div className="mb-4 text-green-400 text-center">{message}</div>}
      {editing ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            className="px-4 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Username"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            type="email"
            className="px-4 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <div className="flex gap-2">
            <button type="submit" className="bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded hover:bg-yellow-300 transition">Save</button>
            <button type="button" className="bg-gray-700 text-gray-100 py-2 px-4 rounded" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-4">
          <div>
            <span className="font-bold text-gray-300">Username:</span> {profile.username}
          </div>
          <div>
            <span className="font-bold text-gray-300">Email:</span> {profile.email}
          </div>
          <button className="bg-yellow-400 text-gray-900 font-bold py-2 rounded hover:bg-yellow-300 transition" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage; 