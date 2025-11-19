import axios from 'axios';

const URL = import.meta.env.VITE_FRONTEND_URL;

const getUsers = async () => {
  const res = await axios.get(`${URL}/api/users`);
  return res.data;
}

const getBlogs = async (username) => {
  const users = await getUsers();
  const user = users.find(u => u.username === username);
  const blogs = user.blogs;
  console.log('getBlogs:', blogs);
  return blogs;
};

export default { getUsers, getBlogs };
