import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Container } from 'react-bootstrap'

const UserList = () => {
  const users = useSelector(state => state.users)

  if (!users) return <div className="text-center mt-4">Loading users...</div>

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Users</h2>

      <Table bordered hover responsive="md" className="text-center shadow-sm">
        <thead className="table-light">
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link
                  to={`/users/${user.id}`}
                  className="text-decoration-none fw-semibold"
                >
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default UserList
