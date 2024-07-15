import React from 'react';
import './Suggestions.css';

function Suggestions({ suggestions }) {
  return (
    <ul className="suggestions">
      {suggestions.map((movie) => (
        <a key={movie.id} href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank" rel="noopener noreferrer">
        <li key={movie.id} className="card">
          <img src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} alt={movie.title} className='img1'/>
          <div className="textBox">
            <h3 className="textContent h1">{movie.title}</h3>
            <p className="span">{movie.release_date}</p>
          </div>
        </li>
        </a>
      ))}
    </ul>
    
  );
}

export default Suggestions;
