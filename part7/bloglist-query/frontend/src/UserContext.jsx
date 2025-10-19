import { createContext, useReducer, useContext, useEffect } from 'react'
import storage from './services/storage'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null)

  useEffect(() => {
    const storedUser = storage.loadUser()
    if (storedUser) dispatch({ type: 'SET', payload: storedUser })
  }, [])

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const { user } = useContext(UserContext)
  return user
}

export const useUserDispatch = () => {
  const { dispatch } = useContext(UserContext)
  return dispatch
}

export default UserContext
