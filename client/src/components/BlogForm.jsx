import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router';

import { add } from '../services/blogService';


const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const { fetchBlogs, showNotification } = useOutletContext();

  const nav = useNavigate();
  
  const resetFields = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const handleAdd = async (blog) => {
    try {
      await add(blog);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = {
      title,
      author: author.trim() || null,
      url
    }
    await handleAdd(blog);
    resetFields();
    nav('../blogs');
  }
  
  return (
    <>
      <h2>Create a new blog</h2>
      <form onSubmit={handleSubmit}>
        <label>
          title
          <input 
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          author
          <input 
            type='text'
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
        </label>
        <br />
        <label>
          url
          <input 
            type='text'
            value={url}
            onChange={e => setUrl(e.target.value)}
            required
          />
        </label>
        <br />
        <button type='submit'>add</button>
      </form>
    </>
  )
}

export default BlogForm;