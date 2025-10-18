import { useState, useEffect, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import loginService from './services/login'
import storage from './services/storage'
import Login from './components/Login'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs, appendBlog, likeBlog, deleteBlog } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)

  const blogs = useSelector(state => state.blogs)

  useEffect(() => { dispatch(initializeBlogs()) }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    if (user) {
      setUser(user)
    }
  }, [])

  const blogFormRef = createRef()

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      storage.saveUser(user)
      dispatch(showNotification(`Welcome back, ${user.name}`, 'success', 5))
    } catch (error) {
      dispatch(showNotification('Wrong credentials', 'error', 5))
    }
  }

  const handleCreate = async (blog) => {
    dispatch(appendBlog(blog))
    dispatch(showNotification(`Blog created: ${blog.title}, ${blog.author}`, 'success', 5))
    blogFormRef.current.toggleVisibility()
  }

  const handleLike = async (blog) => {
    dispatch(showNotification(`You liked ${blog.title} by ${blog.author}`, 'success', 5))
    dispatch(likeBlog(blog))
  }

  const handleLogout = () => {
    setUser(null)
    storage.removeUser()
    dispatch(showNotification(`Bye, ${user.name}!`, 'success', 5))
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
      dispatch(showNotification(`Blog ${blog.title}, by ${blog.author} removed`, 'error', 5))
    }
  }

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Login doLogin={handleLogin} />
      </div>
    )
  }

  const byLikes = (a, b) => b.likes - a.likes

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>
          logout
        </button>
      </div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog doCreate={handleCreate} />
      </Togglable>
      {blogs.slice().sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default App