const Notification = ({ message, type }) => {
  if (!message) return null;

  const className = type === 'success' ? 'notification success' : 'notification error'

  return <div className={className}>{message}</div>
}

export default Notification