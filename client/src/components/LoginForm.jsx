import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';

import { login } from '../services/login';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { showNotification } = useOutletContext();
  const nav = useNavigate();

  const resetFields = () => {
    setUsername('');
    setPassword('');
  }

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      login(username, password);
      showNotification({
        message: 'Welcome back!',
        type: 'success'
      });
      resetFields();
      nav('../blogs');
    } catch (err) {
      console.log(err);
      showNotification({
        message: 'Error!',
        type: 'error'
      });
    }
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