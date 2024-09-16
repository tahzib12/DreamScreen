import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import './MovieList.css';
import SkeletonCard from './Skeleton';

function MovieList({ selectedYear, selectedGenre }) {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true); // Loading state for featured movies
  const [loadingLatest, setLoadingLatest] = useState(true);    // Loading state for latest movies


  const fetchMovies = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

    const loadFeaturedMovies = async () => {
      const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      try {
        const movies = await fetchMovies(API_URL);
        setFeaturedMovies(movies);
      } catch (error) {
        console.error('Error loading featured movies:', error);
        setFeaturedMovies([]);
      }
      finally {
        setLoadingFeatured(true);  // Set loading to false when done
      }
    };

    // Load featured movies initially and only on component mount
    loadFeaturedMovies();
  }, []);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

    const loadLatestMovies = async () => {
      const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
      try {
        const movies = await fetchMovies(API_URL);
        setLatestMovies(movies);
      } catch (error) {
        console.error('Error loading latest movies:', error);
        setLatestMovies([]);
      }
      finally {
        setLoadingLatest(true);  // Set loading to false when done
      }
    };

    // Load latest movies only once on component mount
    loadLatestMovies();
  }, []);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

    const loadMoviesByYear = async (year) => {
      const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&primary_release_year=${year}`;
      try {
        const movies = await fetchMovies(API_URL);
        setFeaturedMovies(movies);
      } catch (error) {
        console.error('Error loading movies by year:', error);
        setFeaturedMovies([]);
      }
    };

    const loadMoviesByGenre = async (genreId) => {
      const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}`;
      try {
        const movies = await fetchMovies(API_URL);
        setFeaturedMovies(movies);
      } catch (error) {
        console.error('Error loading movies by genre:', error);
        setFeaturedMovies([]);
      }
    };

    // Load movies based on selectedYear or selectedGenre
    if (selectedYear) {
      loadMoviesByYear(selectedYear);
    } else if (selectedGenre) {
      // Replace genre names with their corresponding TMDb genre IDs
      let genreId;
      switch (selectedGenre) {
        case "Action":
          genreId = 28;
          break;
        case "Adventure":
          genreId = 12;
          break;
        case "Animation":
          genreId = 16;
          break;
        case "Comedy":
          genreId = 35;
          break;
        case "Crime":
          genreId = 80;
          break;
        case "Documentary":
          genreId = 99;
          break;
        case "Drama":
          genreId = 18;
          break;
        case "Family":
          genreId = 10751;
          break;
        case "Fantasy":
          genreId = 14;
          break;
        case "History":
          genreId = 36;
          break;
        case "Horror":
          genreId = 27;
          break;
        case "Music":
          genreId = 10402;
          break;
        case "Mystery":
          genreId = 9648;
          break;
        case "Romance":
          genreId = 10749;
          break;
        case "Science Fiction":
          genreId = 878;
          break;
        case "TV Movie":
          genreId = 10770;
          break;
        case "Thriller":
          genreId = 53;
          break;
        case "War":
          genreId = 10752;
          break;
        case "Western":
          genreId = 37;
          break;
        default:
          genreId = null;
          break;
      }
      
      if (genreId) {
        loadMoviesByGenre(genreId);
      } else {
        setFeaturedMovies([]);
      }
    }
  }, [selectedYear, selectedGenre]);

  const renderSkeletonCards = () => {
    const numberOfSkeletons = 20;  // Five cards per row, four rows
    return Array.from({ length: numberOfSkeletons }).map((_, index) => (
      <SkeletonCard key={index} />
    ));
  };

  return (
    <div className="movie-list">
      <h2 className='ga-maamli-regular'>{selectedYear ? `${selectedYear} Movies` : selectedGenre ? `${selectedGenre} Movies` : 'Featured Movies'} :-</h2>
      <hr style={{ borderTop: "1px solid yellow",marginLeft: "0px", marginTop: "-10px", marginBottom: "35px" }} />
      <div className="movies-grid">
  {loadingFeatured ? renderSkeletonCards() : featuredMovies.map(movie => (
    <MovieCard key={movie.id} movie={movie} playLink={`https://play.movie.com/${movie.id}`} />
  ))}
</div>
      <h2 style={{marginTop: "4rem"}} className='ga-maamli-regular'>Latest Movies :-</h2> 
      <hr style={{ borderTop: "1px solid yellow", marginLeft: "0px", marginTop: "-10px", marginBottom: "35px" }} />
      <div className="movies-grid">
  {loadingLatest ? renderSkeletonCards() : latestMovies.map(movie => (
    <MovieCard key={movie.id} movie={movie} playLink={`https://play.movie.com/${movie.id}`} />
  ))}
</div>
    </div>
  );
}

export default MovieList;