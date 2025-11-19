import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';

import { login } from '../services/login';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { showNotification, user, setUser } = useOutletContext();
  const nav = useNavigate();

  const resetFields = () => {
    setUsername('');
    setPassword('');
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const user = await login(username, password);
      setUser(user);
      showNotification({
        message: `Welcome back, ${user.name}!`,
        type: 'success'
      });
      resetFields();
      nav('../blogs');
    } catch (err) {
      console.log(err);
      showNotification({
        message: `Error: ${err.response.data.error}`,
        type: 'error'
      });
    }
  }

  if (user?.name && user?.user && user?.token) {
    return <h2>Already logged in as {user.name}</h2>
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          placeholder='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <br />
        <input 
          type='password'
          placeholder='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <br />
        <button type='submit'>login</button>
      </form>
    </>
  )
}

export default LoginForm;