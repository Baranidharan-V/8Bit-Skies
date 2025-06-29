import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const PixelLocationSearch = ({ onLocationChange }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/location?q=${query}`);
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        onLocationChange({ lat, lon });
        setQuery('');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="pixel-container p-6 mb-8 max-w-2xl mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSearch} className="flex gap-4 flex-col sm:flex-row">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ENTER CITY NAME..."
          className="pixel-input flex-grow"
          disabled={isLoading}
        />
        <button 
          type="submit"
          className="pixel-button whitespace-nowrap"
          disabled={isLoading}
        >
          {isLoading ? 'SEARCHING...' : 'SEARCH'}
        </button>
      </form>
    </motion.div>
  );
};

export default PixelLocationSearch;
