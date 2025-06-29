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

  const currentCondition = weather.current.weather[0].main.toLowerCase();

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
            value={`${Math.round(weather.current.temp)}°C`} 
            icon="🌡️"
            description={weather.current.weather[0].description}
          />
          <PixelWeatherCard 
            title="Feels Like" 
            value={`${Math.round(weather.current.feels_like)}°C`} 
            icon="🌡️"
            description="Real feel temperature"
          />
          <PixelWeatherCard 
            title="Humidity" 
            value={`${weather.current.humidity}%`} 
            icon="💧"
            description="Moisture in air"
          />
          <PixelWeatherCard 
            title="Wind Speed" 
            value={`${Math.round(weather.current.wind_speed * 3.6)} KM/H`} 
            icon="💨"
            description="Current wind speed"
          />
          <PixelWeatherCard 
            title="UV Index" 
            value={`${Math.round(weather.current.uvi)}/11`} 
            icon="☀️"
            description="UV radiation level"
          />
          <PixelWeatherCard 
            title="Pressure" 
            value={`${weather.current.pressure} hPa`} 
            icon="🌪️"
            description="Atmospheric pressure"
          />
        </motion.div>
        
        <motion.div 
          className="pixel-container p-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <h2 className="text-xl mb-6 text-center text-cyan-300 tracking-wider">
            🗓️ 7-DAY FORECAST
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
            {weather.daily.slice(0, 7).map((day, index) => {
              const date = new Date(day.dt * 1000);
              const isToday = index === 0;
              
              return (
                <motion.div 
                  key={index} 
                  className="forecast-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <p className="text-xs mb-2 text-cyan-300 font-bold">
                    {isToday ? 'TODAY' : date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                  </p>
                  <div className="text-2xl my-3">
                    {day.weather[0].main === 'Rain' ? '🌧️' : 
                     day.weather[0].main === 'Snow' ? '❄️' :
                     day.weather[0].main === 'Clear' ? '☀️' : 
                     day.weather[0].main === 'Clouds' ? '☁️' : '🌤️'}
                  </div>
                  <p className="text-sm font-bold text-white">
                    {Math.round(day.temp.max)}°C
                  </p>
                  <p className="text-xs text-gray-400">
                    {Math.round(day.temp.min)}°C
                  </p>
                  <p className="text-xs mt-2 text-gray-300">
                    {day.weather[0].description.split(' ').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div 
          className="pixel-container p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <h2 className="text-xl mb-6 text-center text-cyan-300 tracking-wider">
            ⏰ HOURLY FORECAST
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {weather.hourly.slice(0, 6).map((hour, index) => {
              const time = new Date(hour.dt * 1000);
              const isNow = index === 0;
              
              return (
                <motion.div 
                  key={index} 
                  className="forecast-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <p className="text-xs mb-2 text-cyan-300 font-bold">
                    {isNow ? 'NOW' : time.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit', 
                      hour12: false 
                    })}
                  </p>
                  <div className="text-xl my-2">
                    {hour.weather[0].main === 'Rain' ? '🌧️' : 
                     hour.weather[0].main === 'Snow' ? '❄️' :
                     hour.weather[0].main === 'Clear' ? '☀️' : 
                     hour.weather[0].main === 'Clouds' ? '☁️' : '🌤️'}
                  </div>
                  <p className="text-sm font-bold text-white">
                    {Math.round(hour.temp)}°C
                  </p>
                  <p className="text-xs text-gray-400">
                    {hour.pop > 0 ? `${Math.round(hour.pop * 100)}% 🌧️` : 'No Rain'}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
