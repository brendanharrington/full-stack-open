import { Link } from 'react-router';

const NavBar = () => {
  return (
    <nav>
      <div className='nav-section'>
        <Link to='/'>home</Link>
        <Link to='blogs'>blogs</Link>
        <Link to='authors'>authors</Link>
        <Link to='new'>create new</Link>
      </div>
      <div className='nav-section'>
        <Link to='login'>login</Link>
        <Link to='signup'>sign up</Link>
      </div>
    </nav>
  )
}

export default NavBar;