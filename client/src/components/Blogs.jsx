import { useOutletContext } from 'react-router';

import { remove, like } from '../services/blogService';

const Blogs = () => {
  const { blogs, fetchBlogs, showNotification } = useOutletContext();

  const handleDelete = async (blog) => {
    try {
      await remove(blog);
      fetchBlogs();
      showNotification({
        message: 'Blog deleted successfully!',
        type: 'success'
      });
    } catch (err) {
      console.log(err);
      showNotification({
        message: `Error! Blog has already been deleted from the database...`,
        type: 'error'
      });
    }
  };

  const handleLike = async (blog) => {
    try {
      await like(blog);
      fetchBlogs();
      showNotification({
        message: `Added a like to "${blog.title}" by ${blog.author}!`,
        type: 'success'
      });
    } catch (err) {
      console.log(err);
      showNotification({
        message: 'Error! Blog has already been deleted from the database...',
        type: 'error'
      });
    }
  };

  if (!blogs.length) return <div>loading...</div>

  return (
    <>
      <h2>Blogs</h2>
      <table>
        <thead>
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
                <button onClick={() => handleLike(b)}>like</button>
              </td>
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

export default Blogs;