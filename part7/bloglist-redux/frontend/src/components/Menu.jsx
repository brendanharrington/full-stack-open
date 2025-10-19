import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Menu = ({ handleLogout }) => {
  const user = useSelector(state => state.user)

  const style = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    padding: 10
  }

  return (
    <div style={style}>
      <div>
        <Link to='/'>blogs</Link>
        <Link to='/users' style={{ marginLeft: 10 }}>users</Link>
      </div>
      <div>
        {user.name} logged in
        <button
          onClick={handleLogout}
          style={{ marginLeft: 10 }}
        >
          logout
        </button>
      </div>
    </div>
  )
}

export default Menu