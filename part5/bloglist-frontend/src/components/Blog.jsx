import { useState } from 'react'

const Blog = ({ blog, onLike }) => {
  const [displayDetails, setDisplayDetails] = useState(false)

  const toggleVisibility = () => {
    setDisplayDetails(!displayDetails)
  }

  return (
    <div>
      {blog.title} {blog.author} 
      <button onClick={toggleVisibility} className='blog-toggle-btn'>
        {displayDetails ? 'hide' : 'view'}
      </button>
      {displayDetails && (
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={() => onLike(blog)}>like</button></div>
          <div>{blog.user.name}</div>
        </div>
      )}
    </div>  
  )
}

export default Blog