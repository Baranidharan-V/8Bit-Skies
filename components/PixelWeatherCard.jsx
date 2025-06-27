import { motion } from 'framer-motion';

const PixelWeatherCard = ({ title, value, icon, description, className = "" }) => {
  const pixelIcons = {
    '🌡️': '🔥', 
    '💧': '💙', 
    '💨': '🌪️', 
    '☀️': '🌟', 
    '🌧️': '⛈️', 
    '❄️': '❄️', 
    '☁️': '☁️',
    '🌪️': '🌪️'
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`pixel-card ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <div className="pixel-weather-icon mb-4">
          {pixelIcons[icon] || icon}
        </div>
        <h3 className="text-xs mb-2 text-cyan-300 tracking-wider">
          {title.toUpperCase()}
        </h3>
        <p className="text-xl font-bold mb-2 text-white">
          {value}
        </p>
        {description && (
          <p className="text-xs text-gray-300 leading-relaxed">
            {description.toUpperCase()}
          </p>
        )}
      </div>
      
      <div className="absolute top-1 left-1 w-2 h-2 bg-white opacity-50"></div>
      <div className="absolute top-1 right-1 w-2 h-2 bg-white opacity-50"></div>
      <div className="absolute bottom-1 left-1 w-2 h-2 bg-white opacity-50"></div>
      <div className="absolute bottom-1 right-1 w-2 h-2 bg-white opacity-50"></div>
    </motion.div>
  );
};

export default PixelWeatherCard;
