import React, { useState } from 'react';
import { Star } from 'lucide-react';

// ReviewForm component for submitting/editing a review
function ReviewForm({ initialRating = 0, initialComment = '', onSubmit, loading }) {
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);

  // Handle form submit
  const handleSubmit = e => {
    e.preventDefault();
    if (rating < 1 || rating > 5) return;
    onSubmit(rating, comment);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-gray-900 p-4 rounded-lg shadow">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(num => (
          <button
            key={num}
            type="button"
            className="focus:outline-none"
            onClick={() => setRating(num)}
            aria-label={`Rate ${num}`}
          >
            <Star className={
              'w-6 h-6 ' + (rating >= num ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500')
            } />
          </button>
        ))}
        <span className="ml-2 text-gray-300">{rating}/5</span>
      </div>
      <textarea
        className="w-full rounded bg-gray-800 border border-gray-700 text-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        rows={3}
        placeholder="Write your review..."
        value={comment}
        onChange={e => setComment(e.target.value)}
        maxLength={1000}
      />
      <button
        type="submit"
        className="bg-yellow-400 text-gray-900 font-bold py-2 rounded hover:bg-yellow-300 transition"
        disabled={loading || rating < 1}
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}

export default ReviewForm; 