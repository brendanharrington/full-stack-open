import { Outlet } from 'react-router';
import { useState, useEffect } from 'react';

import './assets/styles.css';
import { getAll } from './services/blogService';

import NavBar from './components/NavBar';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const fetchedBlogs = await getAll();
    setBlogs(fetchedBlogs);
  };

  const showNotification = (n) => {
    setNotification(n);
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <>
      <NavBar />

      <h1>Blog List Application</h1>

      {notification && <Notification {...notification} />}
      
      <main>
        <Outlet context={{blogs, setBlogs, notification, showNotification, fetchBlogs}}/>
      </main>
    </>
  )
}

export default App;