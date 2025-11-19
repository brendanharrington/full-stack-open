import { useNavigate, useOutletContext, useParams } from 'react-router';

import blogService from '../services/blogs'

const Blog = () => {
  const id = Number(useParams().id);
  const { blogs, user, fetchData, showNotification } = useOutletContext();

  const blog = blogs.find(b => b.id === id);
  const nav = useNavigate();

  const handleDelete = async () => {
    try {
      if (window.confirm(`Delete "${blog.title}" by "${blog.author ?? 'unknown'}" from the list?`)) {
        await blogService.remove(blog);
        fetchData();
        showNotification({
          message: 'Blog deleted successfully!',
          type: 'success'
        });
        nav('/blogs')
      }
    } catch (err) {
      console.log(err);
      showNotification({
        message: `Error! Blog has already been deleted from the database...`,
        type: 'error'
      });
    }
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date).toDateString();
    return formattedDate;
  };

  if (!blog) return <h2>Not Found...</h2>;

  return (
    <>
      <h2>{blog.title}</h2>
      <div>
        <b>Author: </b>
        {blog.author}
      </div>
      <div>
        <b>URL: </b>
        <a
          href={`https://${blog.url}`}
          target='_blank'
        >
          {blog.url}
        </a>
      </div>
      <div>
        <b>Author: </b>
        {blog.author}
      </div>
      <div>
        <b>Date Added: </b>
        {formatDate(blog.date)}
      </div>
      <div>
        <b>Added by: </b>
        {blog.user.name}
      </div>
      {user?.user === blog.user.username 
        && <button onClick={handleDelete}>delete</button>}
    </>
  )
}

export default Blog;