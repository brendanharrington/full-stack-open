import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import storage from '../services/storage'
import { useState } from 'react'
import { createComment } from '../reducers/blogReducer'

const BlogView = ({ handleLike, handleDelete }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  const [comment, setComment] = useState('')

  if (!blog) return <p>Loading blog...</p>

  if (!blog.user) return <p>Loading user...</p>

  const canRemove = blog.user ? blog.user.username === storage.me() : true

  const handleSubmit = (event) => {
    event.preventDefault()
    if (comment.trim() === '') return
    dispatch(createComment(blog.id, comment))
    setComment('')
  }


  return (
    <div>
      <h2>{blog.title}</h2>
      <p><a href={blog.url} target='_blank' rel='noreferrer'>{blog.url}</a></p>
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
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="comment"
          id="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          placeholder='Add a comment...'
        />
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, i) => {
          return <li key={i}>{comment}</li>
        })}
      </ul>
    </div>
  )
}

export default BlogView