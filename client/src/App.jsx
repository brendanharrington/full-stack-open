import { Outlet } from 'react-router';
import { useState, useEffect } from 'react';

import './assets/styles.css';
import blogService from './services/blogs';
import authorService from './services/authors';

import NavBar from './components/NavBar';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchData();

    if (localStorage.length) {
      const { token, user, name } = localStorage;
      setUser({ token, user, name });
    }
  }, []);

  const fetchData = async () => {
    const fetchedBlogs = await blogService.getAll();
    const fetchedAuthors = await authorService.getAll();
    setBlogs(fetchedBlogs);
    setAuthors(fetchedAuthors);
  };

  const showNotification = (n) => {
    setNotification(n);
    setTimeout(() => setNotification(null), 5000);
  };

  const context = {
    blogs, setBlogs, 
    authors, setAuthors, 
    notification, showNotification, 
    user, setUser,
    fetchData
  };

  return (
    <>
      <NavBar user={user} setUser={setUser} showNotification={showNotification} />

      <h1>Blog List Application</h1>

      {notification && <Notification {...notification} />}
      
      <main>
        <Outlet context={context}/>
      </main>
    </>
  )
}

export default App;