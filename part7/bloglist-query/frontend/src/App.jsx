import { useState, useEffect, createRef } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useNotificationDispatch } from './NotificationContext'
import blogService from './services/blogs'
import loginService from './services/login'
import storage from './services/storage'
import Login from './components/Login'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const [user, setUser] = useState(null)

  const setNotification = (message, type = 'success') => {
    dispatch({ type: 'SET', payload: { message, type } })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setNotification(`Blog created: ${newBlog.title}, ${newBlog.author}`)
    },
    onError: (error) => {
      setNotification('Blog could not be created', 'error')
    }
  })

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setNotification(`You liked "${updatedBlog.title}" by ${updatedBlog.author}`)
    },
    onError: () => {
      setNotification('Failed to update blog', 'error')
    }
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

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
      setNotification(`Welcome back, ${user.name}`)
    } catch (error) {
      setNotification('Wrong credentials', 'error')
    }
  }

  const handleCreate = async (blog) => {
    newBlogMutation.mutate(blog)
  }

  const handleVote = (blog) => {
    updateBlogMutation.mutate({ id: blog.id, updatedBlog: { ...blog, likes: blog.likes + 1 } })
  }

  const handleLogout = () => {
    setUser(null)
    storage.removeUser()
    setNotification(`Bye, ${user.name}!`)
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlogMutation.mutate(blog.id)
      setNotification(`Blog ${blog.title}, by ${blog.author} removed`)
    }
  }

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: false
  })

  if (result.isLoading) return <div>loading blogs...</div>

  if (result.isError) return <div>blog service not available due to problems in server</div>

  const blogs = result.data

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
        {/* <NewBlog /> */}
      </Togglable>
      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleVote={handleVote}
          handleDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default App