import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  const user = useSelector(state => state.users.find(user => user.id === id))

  if (!user) return <div>Loading user...</div>


  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </div>
  )
}

export default User