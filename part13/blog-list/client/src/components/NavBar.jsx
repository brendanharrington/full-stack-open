import { Link, useNavigate } from 'react-router';

const NavBar = ({ user, setUser, showNotification }) => {
  const nav = useNavigate();

  const handleLogout = () => {
    showNotification({
      message: `Bye, ${user.name}!`,
      type: 'success'
    });
    setUser(null);
    localStorage.clear();
    nav('/');
  };

  return (
    <nav>
      <div className='nav-section'>
        <Link to='/'>home</Link>
        <Link to='blogs'>blogs</Link>
        <Link to='authors'>authors</Link>
        {user && <Link to='new'>create new</Link>}
      </div>
      <div className='nav-section'>
        {user
          ? <>
              <div>logged in as {user.name}</div>
              <button onClick={() => nav('profile')}>profile</button>
              <button onClick={handleLogout}>logout</button>
            </>
          : <>
              <button onClick={() => nav('login')}>login</button>
              <button onClick={() => nav('signup')}>sign up</button>
            </>}
      </div>
    </nav>
  )
}

export default NavBar;