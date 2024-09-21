import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = 'dfdf681f06f91d9779e69d8a0c68c3b9';

  const getWeatherByCity = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError('City not found. Please try again.');
    }
  };

  const getWeatherByLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        );
        setWeatherData(response.data);
        setError(null);
      } catch (err) {
        setError('Unable to fetch weather data for your location.');
      }
    });
  };

  const getUniqueForecasts = () => {
    if (!weatherData) return [];

    const uniqueForecasts = {};
    const forecasts = weatherData.list.filter((forecast) => {
      const date = new Date(forecast.dt_txt).toLocaleDateString();
      if (!uniqueForecasts[date]) {
        uniqueForecasts[date] = true;
        return true; // Keep this forecast
      }
      return false; // Skip duplicates
    });

    return forecasts.slice(0, 5); // Limit to 5 unique forecasts
  };

  return (
    <div className="weather-container">
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={getWeatherByCity}>Submit</button>
        <button onClick={getWeatherByLocation}>Use Current Location</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weatherData && (
         <div>
            <h2>Weather Forecast for {weatherData.city.name}</h2>
        <div className="weather-cards">
         {getUniqueForecasts().map((forecast, index) => (
            <div key={index} className="weather-card">
                 <img
                src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                alt={forecast.weather[0].description}
              />
              <p><strong>Date:</strong> {new Date(forecast.dt_txt).toLocaleDateString()}</p>
              <p><strong>Temperature:</strong> {forecast.main.temp} °C</p>
              <p><strong>Wind Speed:</strong> {forecast.wind.speed} m/s</p>
              <p><strong>Humidity:</strong> {forecast.main.humidity}%</p>
              <p><strong>Condition:</strong> {forecast.weather[0].description}</p>
            
            </div>
          ))}
        </div>
      </div>
      )}
    </div>
  );
};

export default Weather;
