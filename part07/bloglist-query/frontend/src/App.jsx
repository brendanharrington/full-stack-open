import { createRef } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useNotificationDispatch } from './NotificationContext'
import { useUserValue, useUserDispatch } from './UserContext'
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
  const notify = useNotificationDispatch()
  const userDispatch = useUserDispatch()
  const user = useUserValue()
  const blogFormRef = createRef()

  const setNotification = (message, type = 'success') => {
    notify({ type: 'SET', payload: { message, type } })
    setTimeout(() => {
      notify({ type: 'CLEAR' })
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

  const handleLogin = async (credentials) => {
    try {
      const loggedUser = await loginService.login(credentials)
      storage.saveUser(loggedUser)
      userDispatch({ type: 'SET', payload: loggedUser })
      setNotification(`Welcome back, ${loggedUser.name}`)
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
    storage.removeUser()
    userDispatch({ type: 'CLEAR' })
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