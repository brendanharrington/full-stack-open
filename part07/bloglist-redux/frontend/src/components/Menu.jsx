import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'

const Menu = ({ handleLogout }) => {
  const user = useSelector(state => state.user)

  return (
    <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
      <Container className="d-flex justify-content-between align-items-center">
        {/* Left side: links */}
        <Nav className="d-flex flex-row">
          <LinkContainer to="/">
            <Nav.Link>Blogs</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/users">
            <Nav.Link className="ms-3">Users</Nav.Link>
          </LinkContainer>
        </Nav>

        {/* Right side: logged in info + logout */}
        <div className="d-flex flex-row align-items-center">
          <span className="me-2">{user.name} logged in</span>
          <Button variant="outline-secondary" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  )
}

export default Menu
