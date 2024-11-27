import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchTracks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tracks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return [];
  }
};

export const searchTracks = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching tracks:', error);
    return [];
  }
};
