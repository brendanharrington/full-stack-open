import { useState } from 'react';

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  
  const resetFields = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = {
      title,
      author: author.trim() || null,
      url
    }
    await addBlog(blog);
    resetFields();
  }
  
  return (
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
  )
}

export default BlogForm;