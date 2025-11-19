const Notification = (notification) => {
  const { message, type } = notification;

  const style = {
    backgroundColor: 'whitesmoke',
    border: 'solid 2px',
    borderColor: type === 'error' ? 'red' : 'green',
    color: type === 'error' ? 'red' : 'green',
    borderRadius: '6px',
    padding: '12px'
  }

  return (
    <div style={style}>{message}</div>
  )
}

export default Notification;