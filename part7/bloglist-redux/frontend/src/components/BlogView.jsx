import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import storage from '../services/storage'
import { createComment } from '../reducers/blogReducer'

const BlogView = ({ handleLike, handleDelete }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  const [comment, setComment] = useState('')

  if (!blog) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading blog...</p>
      </div>
    )
  }

  if (!blog.user) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading user...</span>
        </div>
        <p className="mt-3">Loading user...</p>
      </div>
    )
  }

  const canRemove = blog.user ? blog.user.username === storage.me() : true

  const handleSubmit = (event) => {
    event.preventDefault()
    if (comment.trim() === '') return
    dispatch(createComment(blog.id, comment))
    setComment('')
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-12">

          {/* Blog Card */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h2 className="card-title mb-3">{blog.title}</h2>

              <p className="card-text">
                <a href={blog.url} target="_blank" rel="noreferrer" className="text-decoration-none">
                  <i className="bi bi-link-45deg me-1"></i>
                  {blog.url}
                </a>
              </p>

              <div className="d-flex align-items-center mb-3">
                <span className="badge bg-primary me-2">
                  {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
                </span>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleLike(blog)}
                >
                  <i className="bi bi-hand-thumbs-up me-1"></i>
                  Like
                </button>
              </div>

              <p className="text-muted mb-3">
                Added by <strong>{blog.user.name}</strong>
              </p>

              {canRemove && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    handleDelete(blog)
                    navigate('/')
                  }}
                >
                  <i className="bi bi-trash me-1"></i>
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Comments Section */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="h5 mb-3">Comments</h3>

              <form className="mb-3" onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                  />
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={comment.trim() === ''}
                  >
                    Add Comment
                  </button>
                </div>
              </form>

              {blog.comments.length === 0 ? (
                <p className="text-muted text-center py-3 mb-0">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                <ul className="list-group list-group-flush">
                  {blog.comments.map((c, i) => (
                    <li key={i} className="list-group-item px-0">
                      <i className="bi bi-chat-left-text text-secondary me-2"></i>
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BlogView
