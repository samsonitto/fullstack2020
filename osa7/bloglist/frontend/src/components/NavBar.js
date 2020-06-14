import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

const NavBar = ({ user, handleLogout }) => {
  return (
    <div className='navbar'>
      <Link to='/' className='navbarLink'>blogs</Link>
      <Link to='/users' className='navbarLink'>users</Link>
      {user.name} logged in 
      <Button text={"logout"} handleClick={handleLogout} />
    </div>
  )
}

export default NavBar