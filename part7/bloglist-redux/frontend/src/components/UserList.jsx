import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useSelector(state => state.users)

  const style = {
    textAlign: 'center'
  }

  if (!users) return <div>Loading users...</div>

  return (
    <div>
      <h2>Users</h2>
      <table style={style}>
        <thead>
          <tr>
            <th scope='col'>User</th>
            <th scope='col'>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList