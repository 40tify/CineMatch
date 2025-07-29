import React, { useEffect, useState, useContext } from 'react';
import { getMovieDetails, getReviews, addReview, updateReview, deleteReview } from '../api/movies';
import { getFavorites, addFavorite, removeFavorite } from '../api/users';
import ReviewForm from '../components/ReviewForm';
import { AuthContext } from '../context/AuthContext';
import { Star } from 'lucide-react';

// MovieDetailPage component for CineMatch
function MovieDetailPage({ movieId, navigate }) {
  const { user } = useContext(AuthContext);
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [myReview, setMyReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch movie details, reviews, and favorites
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [m, r, f] = await Promise.all([
        getMovieDetails(movieId),
        getReviews(movieId),
        user ? getFavorites() : [[]],
      ]);
      setMovie(m);
      setReviews(r);
      setFavorites(f);
      if (user) {
        const mine = r.find(rv => rv.user?._id === user.id);
        setMyReview(mine);
      }
      setLoading(false);
    }
    if (movieId) fetchData();
  }, [movieId, user]);

  // Handle add/remove favorite
  const handleFavorite = async () => {
    if (!user) return navigate('login');
    if (favorites.includes(movieId)) {
      await removeFavorite(movieId);
      setFavorites(favorites.filter(id => id !== movieId));
    } else {
      await addFavorite(movieId);
      setFavorites([...favorites, movieId]);
    }
  };

  // Handle review submit
  const handleReviewSubmit = async (rating, comment) => {
    setReviewLoading(true);
    if (myReview) {
      await updateReview(movieId, myReview._id, rating, comment);
    } else {
      await addReview(movieId, rating, comment);
    }
    // Refresh reviews
    const r = await getReviews(movieId);
    setReviews(r);
    setMyReview(r.find(rv => rv.user?._id === user.id));
    setReviewLoading(false);
  };

  // Handle review delete
  const handleReviewDelete = async () => {
    setReviewLoading(true);
    await deleteReview(movieId, myReview._id);
    const r = await getReviews(movieId);
    setReviews(r);
    setMyReview(null);
    setReviewLoading(false);
  };

  if (loading) return <div className="text-center text-gray-400 mt-8">Loading...</div>;
  if (!movie) return <div className="text-center text-red-400 mt-8">Movie not found.</div>;

  // Find trailer (YouTube)
  const trailer = movie.videos?.results?.find(v => v.site === 'YouTube' && v.type === 'Trailer');

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <div className="flex-shrink-0">
          {movie.poster_path ? (
            <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt={movie.title} className="rounded-lg w-64" />
          ) : (
            <div className="w-64 h-96 bg-gray-800 flex items-center justify-center text-gray-500 rounded-lg">No Image</div>
          )}
        </div>
        {/* Info */}
        <div className="flex-1 flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-yellow-400 mb-2">{movie.title}</h2>
          <div className="text-gray-300 text-sm mb-2">{movie.original_title} | {movie.release_date}</div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-400 font-bold">⭐ {movie.vote_average?.toFixed(1)}</span>
            <button
              className={
                'ml-2 p-1 rounded-full ' +
                (favorites.includes(movieId) ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900')
              }
              onClick={handleFavorite}
            >
              <Star className={favorites.includes(movieId) ? 'fill-yellow-400' : ''} />
            </button>
            <span className="text-gray-400 text-sm">{favorites.includes(movieId) ? 'Favorited' : 'Add to Favorites'}</span>
          </div>
          <div className="mb-2">
            <span className="font-bold text-gray-300">Genres:</span> {movie.genres?.map(g => g.name).join(', ')}
          </div>
          <div className="mb-2">
            <span className="font-bold text-gray-300">Overview:</span> {movie.overview}
          </div>
          {trailer && (
            <a
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:underline mt-2"
            >
              Watch Trailer
            </a>
          )}
        </div>
      </div>
      {/* Cast */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-yellow-400 mb-2">Top Cast</h3>
        <div className="flex flex-wrap gap-4">
          {movie.credits?.cast?.slice(0, 6).map(cast => (
            <div key={cast.cast_id} className="flex flex-col items-center w-24">
              {cast.profile_path ? (
                <img src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`} alt={cast.name} className="rounded-full w-16 h-16 object-cover mb-1" />
              ) : (
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-gray-500 mb-1">No Img</div>
              )}
              <span className="text-xs text-gray-300 text-center">{cast.name}</span>
              <span className="text-xs text-gray-500 text-center">{cast.character}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Reviews */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-yellow-400 mb-2">Reviews</h3>
        {user && (
          <div className="mb-4">
            <ReviewForm
              initialRating={myReview?.rating || 0}
              initialComment={myReview?.comment || ''}
              onSubmit={handleReviewSubmit}
              loading={reviewLoading}
            />
            {myReview && (
              <button className="mt-2 text-red-400 hover:underline" onClick={handleReviewDelete} disabled={reviewLoading}>
                Delete My Review
              </button>
            )}
          </div>
        )}
        {reviews.length === 0 ? (
          <div className="text-gray-400">No reviews yet.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {reviews.map(rv => (
              <div key={rv._id} className="bg-gray-900 rounded-lg p-4 shadow flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-yellow-400">{rv.user?.username || 'User'}</span>
                  <span className="text-gray-400 text-sm">{rv.rating}/5</span>
                </div>
                <div className="text-gray-300 mb-1">{rv.comment}</div>
                <div className="text-gray-500 text-xs">{new Date(rv.createdAt).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetailPage; 