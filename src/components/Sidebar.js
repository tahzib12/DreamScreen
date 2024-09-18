import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sidebar.css';

function Sidebar({ handleYearClick, handleGenreClick }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  useEffect(() => {
    if (!API_KEY) {
      console.error('API key is missing');
      return;
    }

    const fetchMovies = async (page) => {
      const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
      try {
        const response = await axios.get(API_URL);
        return response.data.results;
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
    };

    const loadMovies = async () => {
      try {
        const pages = [1, 2];
        const promises = pages.map(page => fetchMovies(page));
        const results = await Promise.all(promises);
        const allMovies = results.flat();
        setMovies(allMovies);
      } catch (error) {
        console.error('Error loading movies:', error);
      }
      finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    loadMovies();
  }, [API_KEY]);

  return (
    <aside className="sidebar">
      <div className="genres">
        <h3 className='ga-maamli-regular'>Genres :</h3>
        <div style={{ display: "flex" }}>
          <div style={{ flex: "1" }} className='generList'>
            <div className='genres-list' onClick={() => handleGenreClick("Action")}>Action</div>
            <div className='genres-list' onClick={() => handleGenreClick("Adventure")}>Adventure</div>
            <div className='genres-list' onClick={() => handleGenreClick("Animation")}>Animation</div>
            <div className='genres-list' onClick={() => handleGenreClick("Comedy")}>Comedy</div>
            <div className='genres-list' onClick={() => handleGenreClick("Crime")}>Crime</div>
            <div className='genres-list' onClick={() => handleGenreClick("Documentary")}>Documen-tary</div>
            <div className='genres-list' onClick={() => handleGenreClick("Drama")}>Drama</div>
            <div className='genres-list' onClick={() => handleGenreClick("Family")}>Family</div>
            <div className='genres-list' onClick={() => handleGenreClick("Fantasy")}>Fantasy</div>
            <div className='genres-list' onClick={() => handleGenreClick("History")}>History</div>
          </div>
          <div style={{ flex: "1" }} className='generList'>
            <div className='genres-list' onClick={() => handleGenreClick("Horror")}>Horror</div>
            <div className='genres-list' onClick={() => handleGenreClick("Music")}>Music</div>
            <div className='genres-list' onClick={() => handleGenreClick("Mystery")}>Mystery</div>
            <div className='genres-list' onClick={() => handleGenreClick("Romance")}>Romance</div>
            <div className='genres-list' onClick={() => handleGenreClick("Science Fiction")}>Science Fiction</div>
            <div className='genres-list' onClick={() => handleGenreClick("TV Movie")}>TV Movie</div>
            <div className='genres-list' onClick={() => handleGenreClick("Thriller")}>Thriller</div>
            <div className='genres-list' onClick={() => handleGenreClick("War")}>War</div>
            <div className='genres-list' onClick={() => handleGenreClick("Western")}>Western</div>
          </div>
        </div>
      </div>
      <div className="release-years">
        <h3 className='ga-maamli-regular' style={{ paddingTop: "10px" }}>Release Years :</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }} className='yearList'>
          {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005].map(year => (
            <div key={year} className='years-list' onClick={() => handleYearClick(year)}>{year}
            </div>
          ))}
        </div>
      </div>
      <div className="popular-movies">
        <h3 className='ga-maamli-regular' style={{ marginTop: "15px", marginBottom: "0px" }}>Popular Movies :</h3>
        <ul className='popularMOvieList' style={{ overflowX: "hidden", overflowY: "auto", height: "102rem", padding: "10px 10px" }}>
          {loading ? (Array.from({ length: 40 }).map((_, index) => (
              <li key={index}>
                <div className="card skeleton">
                  <div className="skeleton-img"></div>
                  <div className="skeleton-textBox">
                    <div className="skeleton-textContent skeleton-title"></div>
                    <div className="skeleton-textContent skeleton-release-date"></div>
                    <div className="skeleton-textContent skeleton-rating"></div>
                  </div>
                </div>
              </li>
            ))
           ) : (
            movies.map((movie) => (
              <a key={movie.id} href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank" rel="noopener noreferrer">
                <li>
                  <div className="card">
                    <img
                      src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'placeholder-image-url'}
                      alt={movie.title}
                      className="img1"
                    />
                    <div className="textBox">
                      <p className="textContent h1">{movie.title}</p>
                      <span className="span">{movie.release_date}</span>
                      <p className="p">Rating: {movie.vote_average}</p>
                    </div>
                  </div>
                </li>
              </a>
            )) )
          }
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
