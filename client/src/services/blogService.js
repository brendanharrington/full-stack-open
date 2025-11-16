import axios from 'axios';

const URL = import.meta.env.VITE_FRONTEND_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

const config = {
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  }
};

export const getAll = async () => {
  const res = await axios.get(`${URL}/api/blogs`);
  return res.data;
};

export const remove = async (blog) => {
  if (window.confirm(`Delete "${blog.title}" by "${blog.author ?? 'unknown'}" from the list?`)) {
    await axios.delete(`${URL}/api/blogs/${blog.id}`);
  }
};

export const like = async (blog) => {
  await axios.put(`${URL}/api/blogs/${blog.id}`, {
    likes: blog.likes + 1
  });
};

export const add = async (blog) => {
  await axios.post(`${URL}/api/blogs`, blog, config);
}
