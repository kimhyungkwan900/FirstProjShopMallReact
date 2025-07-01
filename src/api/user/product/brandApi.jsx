import axios from 'axios';

export const fetchAllBrands = async () => {
  const response = await axios.get('/api/brands');
  return response.data;
};