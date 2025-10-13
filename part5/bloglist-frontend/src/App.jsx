import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  if (!user) {
    return (
      <div>
        <h1>Blog List Application</h1>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <h2>Login</h2>
        <LoginForm onLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h1>Blog List Application</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <p>{user.name} logged in</p>

      <h2>Blogs</h2>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App