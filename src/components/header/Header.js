import React, { useState } from 'react';
import axios from 'axios';
import './Header.css';
import Suggestions from '../suggestion/Suggestions';


function Header() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setQuery(query);

    if (query.length > 2) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${query}`
      );
      setSuggestions(response.data.results);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <header className="header sticky-header">
      <div className="logo">
        <img src="/dreamlogo.png" alt="DreamScreen Logo" className="logo-img" />
        <h1 className='logo-text'>DreamScreen</h1>
      </div>
      <div className="search">
        <input 
          type="text" 
          placeholder="Search..." 
          className='inputBar' 
          value={query}
          onChange={handleInputChange}
        />
        {suggestions.length > 0 && <Suggestions suggestions={suggestions} />}
      </div>
    </header>
  );
}

export default Header;
