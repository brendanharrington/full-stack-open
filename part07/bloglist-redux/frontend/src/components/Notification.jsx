import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification) return null

  const variant = notification.type === 'success' ? 'success' : 'danger'

  return (
    <Alert variant={variant} className="my-3">
      {notification.message}
    </Alert>
  )
}

export default Notification
