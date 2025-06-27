import axios from 'axios';

export default async function handler(req, res) {
  const { q } = req.query;
  const apiKey = process.env.OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }
  
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=5&appid=${apiKey}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Location API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch location data' });
  }
}
