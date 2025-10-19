import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import storage from '../services/storage'

const BlogView = ({ handleLike, handleDelete }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))

  const canRemove = blog.user ? blog.user.username === storage.me() : true

  return (
    <div>
      <h2>{blog.title}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <div>
        {blog.likes} likes
        <button
          style={{ marginLeft: 3 }}
          onClick={() => handleLike(blog)}
        >
          like
        </button>
      </div>
      <p>added by {blog.user.name}</p>
      {canRemove && <button onClick={() => {
        handleDelete(blog)
        navigate('/')
      }}>
        remove
      </button>}
    </div>
  )
}

export default BlogView