import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client/react'
import PropTypes from 'prop-types'
import { LOGIN } from '../queries'

const LoginForm = ({ notify, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      notify(error.errors[0].message, 'error')
      setUsername('')
      setPassword('')
    },
    onCompleted: () => {
     notify(`Welcome back, ${username}!`, 'success') 
    }
  })


  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  notify: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
}

export default LoginForm