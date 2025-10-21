import PropTypes from 'prop-types'

const Notify = ({ notification }) => {
  if ( !notification ) return null
  
  const style = {
    color: notification.type === 'success' ? 'green' : 'red',
    border: 'solid 3px',
    borderRadius: 5,
    borderColor: notification.type === 'success' ? 'green' : 'red',
    backgroundColor: 'lightgrey',
    padding: 10,
    margin: '10px 0'
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

Notify.propTypes = {
  notification: PropTypes.object
}

export default Notify