const SignUpForm = () => {
  return (
    <>
      <h2>Sign up</h2>
      <form>
        <input 
          type='text'
          placeholder='username'
        />
        <br />
        <input 
          type='text'
          placeholder='password'
        />
        <br />
        <input 
          type='text'
          placeholder='confirm password'
        />
        <br />
        <button type='submit'>sign up</button>
      </form>
    </>
  )
}

export default SignUpForm;