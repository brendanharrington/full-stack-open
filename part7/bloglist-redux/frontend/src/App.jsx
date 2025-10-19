import { useEffect, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import loginService from './services/login'
import storage from './services/storage'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs, appendBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser, clearUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeUsers())
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    if (user) {
      dispatch(setUser(user))
    }
  }, [])

  const blogFormRef = createRef()

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      storage.saveUser(user)
      dispatch(setUser(user))
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
    dispatch(clearUser())
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
        <h1>blogs</h1>
        <Notification />
        <Login doLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <Router>
        <h1>blogs</h1>
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

        <Routes>
          <Route path='/' element={<BlogList {...{ blogs, handleLike, handleDelete }} />} />
          <Route path='/users' element={<UserList />} />
          <Route path='/users/:id' element={<User />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App