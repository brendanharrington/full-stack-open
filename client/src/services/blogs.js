import axios from 'axios';

const URL = import.meta.env.VITE_FRONTEND_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

const config = {
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  }
};

const getAll = async () => {
  const res = await axios.get(`${URL}/api/blogs`);
  return res.data;
};

const remove = async (blog) => {
  if (window.confirm(`Delete "${blog.title}" by "${blog.author ?? 'unknown'}" from the list?`)) {
    await axios.delete(`${URL}/api/blogs/${blog.id}`);
  }
};

const like = async (blog) => {
  await axios.put(`${URL}/api/blogs/${blog.id}`, {
    likes: blog.likes + 1
  });
};

const add = async (blog) => {
  await axios.post(`${URL}/api/blogs`, blog, config);
};

const getById = async (id) => {
  const res = await axios.get(`${URL}/api/blogs/${id}`);
  return res.data;
}

export default { getAll, remove, like, add, getById };