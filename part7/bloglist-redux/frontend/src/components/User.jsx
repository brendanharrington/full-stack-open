import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Container, Card, ListGroup } from 'react-bootstrap'

const User = () => {
  const { id } = useParams()
  const user = useSelector(state => state.users.find(user => user.id === id))

  if (!user) return <div className="text-center mt-4">Loading user...</div>

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title as="h2" className="text-center mb-3">
            {user.name}
          </Card.Title>

          <h4 className="mb-3 text-muted">Added Blogs</h4>

          {user.blogs.length === 0 ? (
            <p className="text-muted fst-italic">This user hasn’t added any blogs yet.</p>
          ) : (
            <ListGroup variant="flush">
              {user.blogs.map(blog => (
                <ListGroup.Item key={blog.id} className="d-flex justify-content-between align-items-center">
                  <Link
                    to={`/blogs/${blog.id}`}
                    className="text-decoration-none text-dark fw-semibold"
                  >
                    {blog.title}
                  </Link>
                  <span className="text-muted small">by {blog.author}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default User
