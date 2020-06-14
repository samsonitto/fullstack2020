import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  return (
    <>
      <tr id={user.id} key={user.id} className='blog'>
        <td><Link to={`/${user.id}`}>{user.name}</Link></td>
        <td>{user.blogs.length}</td>
      </tr>
    </>
  )
}

export default User