import React, { useState } from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import './App.css';

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
      <Header />
      <div className="content">
        <Sidebar handleYearClick={handleYearClick} handleGenreClick={handleGenreClick} />
        <MovieList selectedYear={selectedYear} selectedGenre={selectedGenre} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
