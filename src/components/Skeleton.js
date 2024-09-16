import React from 'react';
import './SkeletonCard.css'; 

function SkeletonCard() {
  return (
    <div className="movie-card-skeleton">
      {/* Image placeholder */}
      <div className="placeholder-image"></div>

      {/* Text placeholders */}
      <div className="text-placeholder">
        <div className="text-line w-3/4"></div>
        <div className="text-line w-1/2"></div>
      </div>
    </div>
  );
}

export default SkeletonCard;
