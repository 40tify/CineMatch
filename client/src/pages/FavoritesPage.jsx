import React, { useEffect, useState, useContext } from 'react';
import { getFavorites, removeFavorite } from '../api/users';
import { getMovieDetails } from '../api/movies';
import MovieCard from '../components/MovieCard';
import { AuthContext } from '../context/AuthContext';

// FavoritesPage component for CineMatch
function FavoritesPage({ navigate }) {
  const { user } = useContext(AuthContext);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch favorite movie IDs and details
  useEffect(() => {
    async function fetchFavorites() {
      setLoading(true);
      const ids = await getFavorites();
      setFavoriteIds(ids);
      // Fetch details for each movie
      const details = await Promise.all(ids.map(id => getMovieDetails(id)));
      setMovies(details.filter(Boolean));
      setLoading(false);
    }
    if (user) fetchFavorites();
  }, [user]);

  // Remove from favorites
  const handleRemove = async (movie) => {
    await removeFavorite(movie.id);
    setMovies(movies.filter(m => m.id !== movie.id));
    setFavoriteIds(favoriteIds.filter(id => id !== movie.id));
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">My Favorites</h2>
      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : movies.length === 0 ? (
        <div className="text-center text-gray-400">No favorite movies yet.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={true}
              onFavorite={handleRemove}
              onClick={() => navigate('movieDetail', movie.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage; 