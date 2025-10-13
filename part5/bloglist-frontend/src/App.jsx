import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      showNotification(`Welcome back, ${user.name}!`, 'success')
    } catch {
      showNotification('Wrong credentials', 'error')
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
    showNotification('Logged out successfully', 'success')
  }

  const addBlog = async (title, author, url) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(newBlog))
      showNotification(`Added new blog: "${newBlog.title}" by ${newBlog.author}`, 'success')
    } catch {
      showNotification('Could not add blog to the list', 'error')
    }
  }

  const addLike = async blog => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1
      }

      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map(b => b.id === blog.id ? returnedBlog : b))
    } catch {
      showNotification({ message: 'Could not update likes', type: 'error'})
    }
  }

  if (!user) {
    return (
      <div>
        <h1>Blog List Application</h1>
        {notification && <Notification message={notification.message} type={notification.type}/>}
        <Togglable buttonLabel='Login'>
          <h2>Login</h2>
          <LoginForm onLogin={handleLogin} />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h1>Blog List Application</h1>
      {notification && <Notification message={notification.message} type={notification.type}/>}
      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>

      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <h2>Add Blog to List</h2>
        <BlogForm onCreate={addBlog} />
      </Togglable>

      <h2>Blogs</h2>
      {blogs.map(blog => (
        <div className='blog-container' key={`container-${blog.id}`}>
          <Blog key={blog.id} blog={blog} onLike={addLike} />
        </div>
      ))}
    </div>
  )
}

export default App