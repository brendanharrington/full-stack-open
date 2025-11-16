import axios from 'axios';

const URL = import.meta.env.VITE_FRONTEND_URL;

export const login = async (username, password) => {
  const res = await axios.post(`${URL}/api/login`, {
    username, password
  });

  localStorage.setItem('token', res.data.token);
  localStorage.setItem('user', res.data.user);
  localStorage.setItem('name', res.data.name);
  
  return res.data;
};

export const signup = async (username, name) => {
  await axios.post(`${URL}/api/users`, {
    username, name
  });

  const user = await login(username, 'secret');

  return user;
};
