import { useState } from 'react';

const blogs = [
  {
    title: 'Title 0',
    author: 'Author 0',
    url: 'www.example-0.com'
  },
  {
    title: 'Title 1',
    author: 'Author 1',
    url: 'www.example-1.com'
  },
  {
    title: 'Title 2',
    author: 'Author 2',
    url: 'www.example-2.com'
  }
]

function App() {
  // const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setTitle('');
    setAuthor('');
    setUrl('');
  }

  return (
    <>
      <h1>Blog List Application</h1>
      <h2>Add a Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>
          title
          <input 
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
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
          />
        </label>
        <br />
        <button type='submit'>add</button>
      </form>
      <div>{title}</div>
      <div>{author}</div>
      <div>{url}</div>
      <h2>Blogs</h2>
      <table style={{ width: '100%', textAlign: 'center', border: 'solid' }}>
        <thead style={{ backgroundColor: 'lightgrey' }}>
          <th scope='col'>Title</th>
          <th scope='col'>Author</th>
          <th scope='col'>URL</th>
        </thead>
        <tbody>
          {blogs.map(b => (
            <tr>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
