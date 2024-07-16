import React, { useState } from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import './App.css';
import myVideo from './background_animation.mp4';


function App() {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleYearClick = (year) => {
    setSelectedYear(year);
    setSelectedGenre(null); // Reset selected genre when year is clicked
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setSelectedYear(null); // Reset selected year when genre is clicked
  };

  return (
    <div className="App">
    <video autoPlay muted loop className="video-background" id="myVideo">
        <source src={myVideo} type="video/mp4" />
        Your browser does not support the video tag hh.
      </video>
      <Header  />
      <div className="content">
        <Sidebar handleYearClick={handleYearClick} handleGenreClick={handleGenreClick} />
        <MovieList selectedYear={selectedYear} selectedGenre={selectedGenre} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
