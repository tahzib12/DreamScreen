import React, { useState, useEffect  } from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import './App.css';
import myVideo from './background_animation.mp4';


function App() {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 600);

  const handleYearClick = (year) => {
    setSelectedYear(year);
    setSelectedGenre(null); // Reset selected genre when year is clicked
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setSelectedYear(null); // Reset selected year when genre is clicked
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

   // Add a resize event listener to handle screen size changes
   useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="App">
    <video autoPlay muted loop className="video-background" id="myVideo">
        <source src={myVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Header  />
      <div className="content">
      {showSidebar && <Sidebar handleYearClick={handleYearClick} handleGenreClick={handleGenreClick} showSidebar={showSidebar}  toggleSidebar={toggleSidebar}/>}
        <MovieList selectedYear={selectedYear} selectedGenre={selectedGenre} toggleSidebar={toggleSidebar}/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
