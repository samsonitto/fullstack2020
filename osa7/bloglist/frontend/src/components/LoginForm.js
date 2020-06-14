import React from 'react'
import Input from './Input'
import Button from './Button'
import PropTypes from 'prop-types'

const LoginForm = (props) => (
  <form onSubmit={props.handleLogin}>
    <div>
      username
      <Input
        type="text"
        value={props.username}
        name="Username"
        handleOnChange={({ target }) => props.setUsername(target.value)}
        id="inputUsername"
      />
    </div>
    <div>
      password
      <Input
        type="password"
        value={props.password}
        name="Password"
        handleOnChange={({ target }) => props.setPassword(target.value)}
        id="inputPassword"
      />
    </div>
    <Button type="submit" text="Login" id="loginButton" />
  </form>      
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm