import axios from 'axios';

const URL = import.meta.env.VITE_FRONTEND_URL;

export const getAll = async () => {
  const res = await axios.get(`${URL}/api/authors`);
  return res.data;
};

export default { getAll };