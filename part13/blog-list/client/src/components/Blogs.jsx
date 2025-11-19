import { useOutletContext, Link } from 'react-router';

import blogService from '../services/blogs';

const Blogs = () => {
  const { blogs, fetchData, showNotification } = useOutletContext();

  const handleLike = async (blog) => {
    try {
      await blogService.like(blog);
      fetchData();
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
                <button onClick={() => handleLike(b)}>like</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Blogs;