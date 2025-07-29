import React from 'react';
import { Star } from 'lucide-react';

// MovieCard component for displaying a movie
function MovieCard({ movie, onClick, isFavorite, onFavorite }) {
  return (
    <div className="bg-gray-900 rounded-lg shadow hover:shadow-lg transition cursor-pointer flex flex-col" onClick={onClick}>
      {/* Movie Poster */}
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          alt={movie.title}
          className="rounded-t-lg w-full h-64 object-cover"
        />
      ) : (
        <div className="h-64 flex items-center justify-center bg-gray-800 rounded-t-lg text-gray-500">No Image</div>
      )}
      {/* Movie Info */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg text-yellow-400 mb-1 truncate">{movie.title}</h3>
          <p className="text-gray-400 text-sm mb-2">{movie.release_date?.slice(0, 4)}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-300">⭐ {movie.vote_average?.toFixed(1) || 'N/A'}</span>
          <button
            type="button"
            className={
              'ml-2 p-1 rounded-full ' +
              (isFavorite ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900')
            }
            onClick={e => { e.stopPropagation(); onFavorite && onFavorite(movie); }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star className={isFavorite ? 'fill-yellow-400' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard; 