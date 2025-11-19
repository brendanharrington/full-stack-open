import { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router';

import userService from '../services/users';
import blogService from '../services/blogs';
import { update } from '../services/login';

const Profile = () => {
  const { user, setUser, showNotification, fetchData } = useOutletContext();

  const [username, setUsername] = useState('');
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (!user) return;  
    fetchBlogs();
  }, [user]);
  
  const fetchBlogs = async () => {
    const fetchedBlogs = await userService.getBlogs(user.user);
    setBlogs(fetchedBlogs);
  };
  

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (username === user.user) {
        showNotification({
          message: 'Username cannot be the same as previous username!',
          type: 'error'
        });
        return;
      }

      const updatedUser = await update(user.user, username);
      setUser({ ...user, user: updatedUser.username })

      showNotification({
        message: `Username successfully changed to ${username}`,
        type: 'success'
      });

      setUsername('');
    } catch (err) {
      console.log(err);
      showNotification({
        message: `Error: ${err.response.data.details}`,
        type: 'error'
      })
    }
  }

  const handleDelete = async (blog) => {
      try {
        if (window.confirm(`Delete "${blog.title}" by "${blog.author ?? 'unknown'}" from the list?`)) {
          await blogService.remove(blog);
          fetchData();
          fetchBlogs();
          showNotification({
            message: 'Blog deleted successfully!',
            type: 'success'
          });
        }
      } catch (err) {
        console.log(err);
        showNotification({
          message: `Error! Blog has already been deleted from the database...`,
          type: 'error'
        });
      }
    };

  if (!user) {
    return <h2>Not logged in!</h2>
  }
  
  if (!blogs) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <h2>Profile</h2>
      <h3>Change Username</h3>
      <div>current username: {user?.user}</div>
      <form onSubmit={handleSubmit}>
        new username:
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <button type='submit'>update</button>
      </form>
      <h3>Blogs</h3>
      <table>
        <thead>
          <tr>
            <th scope='col'>Title</th>
            <th scope='col'>Author</th>
            <th scope='col'>Likes</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((b, idx) => (
            <tr key={idx}>
              <td>
                <Link to={`/blogs/${b.id}`}>{b.title}</Link>
              </td>
              <td>{b.author ?? 'unknown'}</td>
              <td>{b.likes}</td>
              <td>
                <button onClick={() => handleDelete(b)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Profile;