import Blog from './Blog'

const BlogList = ({ blogs, handleLike, handleDelete }) => {
  const byLikes = (a, b) => b.likes - a.likes

  return (
    <div>
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

export default BlogList