import React, { useState } from 'react'

const LoginForm = ({ login, show }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (!show) {
    return null
  }

  const handleLogin = (e) => {
    e.preventDefault()

    login(username, password)

    setUsername('')
    setPassword('')

    document.getElementById('username').value = ''
    document.getElementById('pw').value = ''
  }

  return (
    <form onSubmit={handleLogin}>
      <h3>Login</h3>
      Username:<input id='username' placeholder='username...' type='text' onChange={(e) => setUsername(e.target.value)} /><br />
      Password:<input id='pw' placeholder='password...' type='password' onChange={(e) => setPassword(e.target.value)} /><br />
      <button>Submit</button>
    </form>
  )
}

export default LoginForm