import { Link } from 'react-router';

const NavBar = () => {
  return (
    <nav>
      <Link to='/'>home</Link>
      <Link to='blogs'>blogs</Link>
      <Link to='new'>create new</Link>
      <Link to='login'>login</Link>
    </nav>
  )
}

export default NavBar;