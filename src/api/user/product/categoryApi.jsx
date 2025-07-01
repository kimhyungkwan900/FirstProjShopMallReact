import axios from 'axios';

export const fetchAllCategories = async () => {
  const response = await axios.get('/api/categories');
  return response.data;
};