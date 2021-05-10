import React, { useState } from "react";
import "./App.css";
const api = {
  // "hides " the api key and base. probably better to call from different script and hidefrom github when uploaded
  key: "abcac50747009dc1ed93efeccdbb253a",
  base: "https://api.openweathermap.org/data/2.5/",
};
//simple way to get date/time
let date = String(new window.Date());
// slices date down from long format(log out the date to see long string.)
date = date.slice(0, 15);
console.log(date);

// breaks down a returned date from the future using epoch time and displays it as a day. moving this code around a bit you can draw out any part from the date/time/week

function App() {
  // sets the current weather and setst the search using the set query,query
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  // waits for the enter key to be pressed after something has been entered in the search bar
  const search = (evt) => {
    if (evt.key === "Enter") {
      //makes a call to the api and returns data
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        //converts the raw data to .json better for humans to read
        .then((res) => res.json())

        .then((result) => {
          // asigns the result from the api call to setWeather
          setWeather(result);
          //resets the searchbox
        });

      setQuery("");
    }
  };
  const searchButton = (evt) => {
    //makes a call to the api and returns data
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      //converts the raw data to .json better for humans to read
      .then((res) => res.json())

      .then((result) => {
        // asigns the result from the api call to setWeather
        setWeather(result);
        //resets the searchbox
        setQuery("");
      });
  };
  // const d = new Date(1394104654000).toString().slice(0, 3);
  // console.log(d);
  // const dayOne = new Date(Date.now() + 86400000).toString().slice(0, 3);
  // const dayTwo = new Date(Date.now() + 86400000 * 2).toString().slice(0, 3);
  // const dayThree = new Date(Date.now() + 86400000 * 3).toString().slice(0, 3);
  // const dayFour = new Date(Date.now() + 86400000 * 4).toString().slice(0, 3);
  // const dayFive = new Date(Date.now() + 86400000 * 5).toString().slice(0, 3);
  // const daySix = new Date(Date.now() + 86400000 * 6).toString().slice(0, 3);
  // const daySeven = new Date(Date.now() + 86400000 * 7).toString().slice(0, 3);
  // console.log(dayOne, dayTwo, dayThree, dayFour, dayFive, daySix, daySeven);

  return (
    <div className="App">
      <header>
        <h1>Weather.ly</h1>
      </header>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="London, New York, Paris"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          <button className="search-button" onClick={searchButton}>
            Search
          </button>
        </div>
        {typeof weather.main != "undefined" ? (
          <div className="local-weather">
            <div className="location-box">
              <h2 className="location">
                {/* sets the weatehr name and country from the search query return and filters out what we need using api docs   */}
                {weather.name}, {weather.sys.country}
              </h2>
              {/* calls the date from the code at the top of page */}
              <div className="date">{date}</div>
            </div>

            {/* rounds the returned temp to the nearest whole number */}
            <h3 className="temp">{Math.round(weather.main.temp)}°c</h3>
            {/* [0] takes the first weather result at index 0 if there are multiple results for a large city. */}
            <h4 className="weather">{weather.weather[0].main}</h4>
          </div>
        ) : (
          <div className="local-blank">{weather.message}</div>
        )}
        {typeof weather.main != "undefined" ? (
          <div className="weather-right">
            <h4 className="humidity">Humidity {weather.main.humidity}%</h4>
            <h4 className="wind">Wind Speed {weather.wind.speed} metre/sec</h4>
            <h4 className="clouds">Cloudiness {weather.clouds.all}%</h4>
            <h4 className="pressure">
              Air Pressure {weather.main.pressure} mb
            </h4>
          </div>
        ) : (
          <div className="weather-right">{weather.message}</div>
        )}
        {typeof weather.main != "undefined" ? (
          <div className="weather-left">
            <h4 className="long">Longtitude {weather.coord.lon}</h4>
            <h4 className="lat">Latitude {weather.coord.lat}</h4>
            <h4 className="min-temp">Min Tempreture {weather.main.temp_min}</h4>
            <h4 className="max-temp">Max Tempreture {weather.main.temp_max}</h4>
          </div>
        ) : (
          <div className="weather-left">{weather.message}</div>
        )}
      </main>
    </div>
  );
}

export default App;
