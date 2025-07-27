import React from "react";
import { useState } from "react";

const WeatherApp = () => {
  const [locationData, SetLocationData] = useState({});
  const [weatherData, SetWeatherData] = useState({});
  const { city } = locationData;
  const { temp } = weatherData;

  const API_KEY = import.meta.env.VITE_API_KEY;

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const cityInput = e.target[0].value.trim();

    if (!cityInput) {
      alert("Please enter a city name");
      return;
    }

    try {
      // First API call to get coordinates
      const geoResponse = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoResponse.json();

      if (!geoData || geoData.length === 0) {
        alert("City not found");
        return;
      }

      const locationInfo = {
        city: cityInput,
        lat: geoData[0].lat,
        lon: geoData[0].lon,
      };

      SetLocationData(locationInfo);

      // Second API call to get weather data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${API_KEY}&units=metric&lang=en`
      );
      const weatherApiData = await weatherResponse.json();

      const weatherInfo = {
        temp: weatherApiData.main.temp,
        description: weatherApiData.weather[0].description,
        icon: weatherApiData.weather[0].icon,
      };

      SetWeatherData(weatherInfo);
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="main">
      <h1>Weather App</h1>
      <form onSubmit={HandleSubmit}>
        <input type="text" placeholder="Enter city" />
        <button type="submit">Search</button>
      </form>

      {city && temp && (
        <div className="content">
          <div>
            <h2>{city}</h2>
            <h2>{`${Math.round(temp)}°C`}</h2>
          </div>
          {weatherData.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              alt="Weather icon"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
