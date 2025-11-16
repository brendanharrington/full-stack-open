import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';

import { signup } from '../services/login';

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const { user, setUser, showNotification } = useOutletContext();

  const nav = useNavigate();

  const resetFields = () => {
    setName('')
    setUsername('');
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const user = await signup(username, name);
      setUser(user);
      showNotification({
        message: `Welcome, ${user.name}!`,
        type: 'success'
      });
      resetFields();
      nav('../blogs');
    } catch (err) {
      console.log(err);
      showNotification({
        message: `Error: ${err.response.data.details}`,
        type: 'error'
      });
    }
  }

  if (user?.name && user?.user && user?.token) {
    return <h2>Already logged in as {user.name}</h2>
  }

  return (
    <>
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          placeholder='name'
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <br />
        <input 
          type='text'
          placeholder='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <br />
        <button type='submit'>sign up</button>
      </form>
    </>
  )
}

export default SignUpForm;