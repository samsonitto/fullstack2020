import React, { useState } from 'react'
import { LOGIN } from './queries'
import { useMutation } from '@apollo/client'
import { setContext } from 'apollo-link-context'

const LoginForm = ({ setError, login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    login(username, password)

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <h3>Login</h3>
      Username:<input placeholder='username...' type='text' onChange={(e) => setUsername(e.target.value)} /><br />
      Password:<input placeholder='password...' type='password' onChange={(e) => setPassword(e.target.value)} /><br />
      <button>Submit</button>
    </form>
  )
}

export default LoginForm