import { useState } from 'react'

const Blog = ({ blog, onLike, onRemove, user }) => {
  const [displayDetails, setDisplayDetails] = useState(false)

  const toggleVisibility = () => {
    setDisplayDetails(!displayDetails)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      onRemove(blog.id)
    }
  }

  const canDelete =
    user && blog.user && user.username === blog.user.username

  return (
    <div className='blog-container'>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility} className='blog-toggle-btn'>
        {displayDetails ? 'hide' : 'view'}
      </button>

      {displayDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button
              className='like-btn'
              onClick={() => onLike(blog)}
            >
              like
            </button>
          </div>
          <div>{blog.user?.name}</div>
          {canDelete && <button onClick={handleDelete}>delete</button>}
        </div>
      )}
    </div>
  )
}

export default Blog