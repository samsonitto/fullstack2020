import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import { Navbar, Nav } from 'react-bootstrap'

const NavBar = ({ user, handleLogout }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link to='/' className='navbarLink'>BLOGS</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to='/users' className='navbarLink'>USERS</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user
              ? <em>{user.name} logged in</em>
              : <Link to="/login">login</Link>
            }
          </Nav.Link>
          <Button text={"logout"} handleClick={handleLogout} />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
/*     <div className='navbar'>
      <Link to='/' className='navbarLink'>blogs</Link>
      <Link to='/users' className='navbarLink'>users</Link>
      {user.name} logged in 
      <Button text={"logout"} handleClick={handleLogout} />
    </div> */
  )
}

export default NavBar