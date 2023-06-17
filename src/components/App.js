import React, { useState, useEffect } from "react";

// Define the API key and URL
const apiKey = "f6bd567f"; // Replace this with your own API key from http://www.omdbapi.com/apikey.aspx
const apiUrl = "http://www.omdbapi.com/?apikey=" + apiKey + "&s=";

// Define a custom component for the movie
function Movie({ movie }) {
  return (
    <li className="movie">
      <div className="movie-info">
        <span className="movie-title">{movie.Title}({movie.Year})</span>
      </div>
      <img src={movie.Poster} alt={movie.Title} />
    </li>
  );
}

// Define a custom component for the search bar
function SearchBar({ query, setQuery }) {
  // Define a function to handle the input change
  function handleChange(event) {
    // Get the value of the input
    let value = event.target.value;

    // Set the query state to the value
    setQuery(value);
  }

  return (
 
     <input
      type="text"
      value={query}
      onChange={handleChange}
      className="search-bar"
      placeholder="Search for movies..."
    />
  
  );
}

// Define a custom component for the app
function App() {
  // Define a state for the query
  const [query, setQuery] = useState("");

  // Define a state for the movies
  const [movies, setMovies] = useState([]);

  // Define a state for the error
  const [error, setError] = useState("");

  // Define a state for the loading status
  const [loading, setLoading] = useState(false);

  // Define a function to fetch movies from the API
  function fetchMovies() {
    // Clear the previous movies and error
    setMovies([]);
    setError("");

    // Set the loading status to true
    setLoading(true);

    // If the query is empty, return
    if (query === "") {
      return;
    }

    // Fetch the data from the API
    fetch(apiUrl + query)
      .then((response) => response.json())
      .then((data) => {
        // If the response is successful and has results
        if (data.Response === "True" && data.Search.length > 0) {
          // Set the movies state to the results
          setMovies(data.Search);
        } else {
          // If the response is unsuccessful or has no results, set the error state to an error message
          setError("Invalid movie name. Please try again.");
        }
      })
      .catch((error) => {
        // If there is an error, set the error state to an error message
        setError("Something went wrong. Please try again.");
      })
      .finally(() => {
        // Set the loading status to false
        setLoading(false);
      });
  }

  // Define a useEffect hook to run only once when the component mounts
  useEffect(() => {
    // Fetch movies with an initial query
    fetchMovies()
  }, []); // Add an empty dependency array to run the effect only once

  return (
    <div className="container">
     <form>
     <SearchBar query={query} setQuery={setQuery} />
      <button onClick={fetchMovies}>Search</button>
     </form>
      <div className="results">
        {/* {loading && <div className="loading">Loading...</div>} */}
        <ul>
        {movies.map((movie) => (
          <Movie key={movie.imdbID} movie={movie} />
        ))}
        </ul>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default App;
