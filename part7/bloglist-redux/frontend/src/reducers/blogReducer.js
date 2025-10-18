import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updated = action.payload
      return state.map(b => b.id !== updated.id ? b : updated)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { setBlogs, updateBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const appendBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(blogSlice.actions.createBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    dispatch(updateBlog(returnedBlog))
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogSlice.reducer