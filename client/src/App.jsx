import { useEffect, useState } from 'react';
import axios from 'axios';

import Notification from './components/Notification';
import BlogForm from './components/BlogForm';

const BASE_URL = 'http://localhost:5173';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const response = await axios.get(`${BASE_URL}/api/blogs`);
    setBlogs(response.data);
  };  

  const showNotification = (n) => {
    setNotification(n);
    setTimeout(() => setNotification(null), 5000);
  }; 

  const addBlog = async (blog) => {
    try {
      await axios.post(`${BASE_URL}/api/blogs`, blog);
      fetchBlogs();
      showNotification({
        message: 'Blog added successfully!',
        type: 'success'
      });
    } catch (error) {
      showNotification({
        message: `Error: ${error}`,
        type: 'error'
      });
    }
  };

  const deleteBlog = async (b) => {
    try {
      if (window.confirm(`Delete "${b.title}" by "${b.author ?? 'unknown'}" from the list?`)) {
        await axios.delete(`${BASE_URL}/api/blogs/${b.id}`)
        fetchBlogs();
        showNotification({
          message: 'Blog deleted successfully!',
          type: 'success'
        })
      }
    } catch (error) {
      showNotification({
        message: `Error! Blog has already been deleted from the database...`,
        type: 'error'
      });
    }
  }

  const likeBlog = async (b) => {
    try {
      await axios.put(`${BASE_URL}/api/blogs/${b.id}`, {
        likes: b.likes + 1
      });
      fetchBlogs();
      showNotification({
        message: 'Blog deleted successfully!',
        type: 'success'
      });
    } catch (error) {
      showNotification({
        message: 'Error! Blog has already been deleted from the database...',
        type: 'error'
      })
    }
  }

  if (!blogs.length) return 'Loading...';

  return (
    <>
      <h1>Blog List Application</h1>
      {notification && <Notification {...notification} />}
      <h2>Add a Blog</h2>
      <BlogForm addBlog={addBlog} />
      <h2>Blogs</h2>
      <table style={{ width: '100%', textAlign: 'center', border: 'solid' }}>
        <thead style={{ backgroundColor: 'lightgrey' }}>
          <tr>
            <th scope='col'>Title</th>
            <th scope='col'>Author</th>
            <th scope='col'>URL</th>
            <th scope='col'>Likes</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((b, idx) => (
            <tr key={idx}>
              <td>{b.title}</td>
              <td>{b.author ?? 'unknown'}</td>
              <td>{b.url}</td>
              <td>{b.likes}</td>
              <td>
                <button onClick={() => likeBlog(b)}>like</button>
              </td>
              <td>
                <button onClick={() => deleteBlog(b)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
