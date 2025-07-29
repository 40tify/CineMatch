import React, { useState } from 'react';
import { searchMovies } from '../api/movies';
import MovieCard from '../components/MovieCard';

// HomePage component for CineMatch
function HomePage({ navigate }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Handle search submit
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    const data = await searchMovies({ q: query, page: 1 });
    if (data && data.results) {
      setResults(data.results);
      setPage(data.page);
      setTotalPages(data.total_pages);
    } else {
      setResults([]);
      setError(data.message || 'No results found.');
    }
    setLoading(false);
  };

  // Handle pagination
  const handlePageChange = async (newPage) => {
    setLoading(true);
    setError('');
    const data = await searchMovies({ q: query, page: newPage });
    if (data && data.results) {
      setResults(data.results);
      setPage(data.page);
      setTotalPages(data.total_pages);
    } else {
      setResults([]);
      setError(data.message || 'No results found.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      {/* Hero Section */}
      <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400 mb-4 text-center">Welcome to CineMatch</h1>
      <p className="text-lg sm:text-xl text-gray-300 mb-8 text-center max-w-2xl">
        Discover, search, save, rate, and review movies. Get personalized recommendations and manage your favorites and watchlists. CineMatch is your ultimate movie companion!
      </p>
      {/* Search Bar */}
      <form className="w-full max-w-xl mb-8 flex" onSubmit={handleSearch}>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-l-lg border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Search for movies..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-yellow-400 text-gray-900 font-bold rounded-r-lg hover:bg-yellow-300 transition"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {/* Error Message */}
      {error && <div className="mb-4 text-red-400">{error}</div>}
      {/* Movie Results Grid */}
      <div className="w-full max-w-5xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {results.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => navigate('movieDetail', movie.id)}
          />
        ))}
      </div>
      {/* Pagination */}
      {results.length > 0 && (
        <div className="flex gap-2 mt-6">
          <button
            className="px-3 py-1 bg-gray-800 text-gray-100 rounded disabled:opacity-50"
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1 || loading}
          >
            Prev
          </button>
          <span className="text-gray-300 px-2 py-1">{page} / {totalPages}</span>
          <button
            className="px-3 py-1 bg-gray-800 text-gray-100 rounded disabled:opacity-50"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages || loading}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage; 