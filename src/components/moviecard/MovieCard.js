import React from 'react';
import './MovieCard.css';

function MovieCard({ movie, playLink }) {
  if (!movie) {
    return null; // Or you can return a placeholder element
  }

  const { poster_path, title, release_date } = movie;

  return (
    <a href={playLink} target="_blank" rel="noopener noreferrer" className="movie-card-link">
      <div className="movie-card">
        {poster_path ? (
          <img src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt={title} />
        ) : (
          <div className="no-poster">No Image Available</div>
        )}
        <div className="movie-info">
          <h3>{title}</h3>
          <p>{release_date}</p> 
        </div>
      </div>
    </a>
  );
}

export default MovieCard;
