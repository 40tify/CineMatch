import React, { useEffect, useState, useContext } from 'react';
import { getWatchlists, createWatchlist, updateWatchlist, deleteWatchlist } from '../api/users';
import { getMovieDetails } from '../api/movies';
import MovieCard from '../components/MovieCard';
import { AuthContext } from '../context/AuthContext';

// WatchlistsPage component for CineMatch
function WatchlistsPage({ navigate }) {
  const { user } = useContext(AuthContext);
  const [watchlists, setWatchlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '' });
  const [selected, setSelected] = useState(null);

  // Fetch watchlists
  useEffect(() => {
    async function fetchWatchlists() {
      setLoading(true);
      const data = await getWatchlists();
      setWatchlists(data);
      setLoading(false);
    }
    if (user) fetchWatchlists();
  }, [user]);

  // Handle create/edit form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) return;
    if (selected) {
      await updateWatchlist(selected._id, form);
    } else {
      await createWatchlist(form);
    }
    setShowForm(false);
    setForm({ name: '', description: '' });
    setSelected(null);
    // Refresh
    const data = await getWatchlists();
    setWatchlists(data);
  };

  // Handle edit
  const handleEdit = (wl) => {
    setSelected(wl);
    setForm({ name: wl.name, description: wl.description });
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    await deleteWatchlist(id);
    setWatchlists(watchlists.filter(wl => wl._id !== id));
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">My Watchlists</h2>
      <div className="mb-4 flex justify-center">
        <button
          className="bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded hover:bg-yellow-300 transition"
          onClick={() => { setShowForm(true); setSelected(null); setForm({ name: '', description: '' }); }}
        >
          + New Watchlist
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6 bg-gray-900 p-4 rounded-lg shadow flex flex-col gap-3">
          <input
            type="text"
            className="px-4 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Watchlist Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <textarea
            className="px-4 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Description (optional)"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <div className="flex gap-2">
            <button type="submit" className="bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded hover:bg-yellow-300 transition">
              {selected ? 'Update' : 'Create'}
            </button>
            <button type="button" className="bg-gray-700 text-gray-100 py-2 px-4 rounded" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : watchlists.length === 0 ? (
        <div className="text-center text-gray-400">No watchlists yet.</div>
      ) : (
        <div className="flex flex-col gap-8">
          {watchlists.map(wl => (
            <div key={wl._id} className="bg-gray-900 rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-bold text-lg text-yellow-400">{wl.name}</h3>
                  <p className="text-gray-400 text-sm">{wl.description}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-yellow-400 hover:underline" onClick={() => handleEdit(wl)}>Edit</button>
                  <button className="text-red-400 hover:underline" onClick={() => handleDelete(wl._id)}>Delete</button>
                </div>
              </div>
              {/* Movie cards in watchlist */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {wl.movieIds && wl.movieIds.length > 0 ? (
                  wl.movieIds.map(id => (
                    <MovieCard
                      key={id}
                      movie={{ id }} // Only ID, details can be fetched if needed
                      onClick={() => navigate('movieDetail', id)}
                    />
                  ))
                ) : (
                  <div className="text-gray-400 col-span-full">No movies in this watchlist.</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchlistsPage; 