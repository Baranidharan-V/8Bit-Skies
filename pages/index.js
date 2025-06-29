import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import PixelWeatherCard from '../components/PixelWeatherCard';
import PixelBackground from '../components/PixelBackground';
import PixelLocationSearch from '../components/PixelLocationSearch';

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState({ lat: 51.5074, lon: -0.1278 });
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState("London");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/weather?lat=${location.lat}&lon=${location.lon}`);
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [location]);

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    // Get location name from coordinates
    axios.get(`/api/reverse-geocode?lat=${newLocation.lat}&lon=${newLocation.lon}`)
      .then(response => {
        if (response.data.length > 0) {
          setLocationName(response.data[0].name);
        }
      })
      .catch(error => console.error('Error getting location name:', error));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PixelBackground condition="clear" />
        <motion.div 
          className="pixel-container p-8 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-lg mb-4 text-cyan-300">LOADING WEATHER DATA...</div>
          <div className="loading-spinner"></div>
        </motion.div>
      </div>
    );
  }

  if (!weather) return null;

  // Use the new structure for /weather endpoint
  const currentCondition = weather.weather?.[0]?.main?.toLowerCase() || "clear";

  return (
    <div className="min-h-screen p-4 relative">
      <PixelBackground condition={currentCondition} />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h1 
          className="pixel-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          PIXEL WEATHER
        </motion.h1>
        
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl text-cyan-300 mb-2">📍 {locationName.toUpperCase()}</h2>
          <p className="text-sm text-gray-300">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }).toUpperCase()}
          </p>
        </motion.div>
        
        <PixelLocationSearch onLocationChange={handleLocationChange} />
        
        <motion.div 
          className="pixel-grid mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <PixelWeatherCard 
            title="Temperature" 
            value={`${Math.round(weather.main.temp)}°C`} 
            icon="🌡️"
            description={weather.weather?.[0]?.description || "No description"}
          />
          <PixelWeatherCard 
            title="Feels Like" 
            value={`${Math.round(weather.main.feels_like)}°C`} 
            icon="🌡️"
            description="Real feel temperature"
          />
          <PixelWeatherCard 
            title="Humidity" 
            value={`${weather.main.humidity}%`} 
            icon="💧"
            description="Moisture in air"
          />
          <PixelWeatherCard 
            title="Wind Speed" 
            value={`${Math.round(weather.wind.speed * 3.6)} KM/H`} 
            icon="💨"
            description="Current wind speed"
          />
          <PixelWeatherCard 
            title="Pressure" 
            value={`${weather.main.pressure} hPa`} 
            icon="🌪️"
            description="Atmospheric pressure"
          />
        </motion.div>
      </div>
    </div>
  );
}
