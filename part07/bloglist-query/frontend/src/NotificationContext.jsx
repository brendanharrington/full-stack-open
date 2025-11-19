import { createContext, useReducer, useContext, act } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return { message: action.payload.message, type: action.payload.type }
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={{ notification, notificationDispatch }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const { notification } = useContext(NotificationContext)
  return notification
}

export const useNotificationDispatch = () => {
  const { notificationDispatch } = useContext(NotificationContext)
  return notificationDispatch
}

export default NotificationContext
