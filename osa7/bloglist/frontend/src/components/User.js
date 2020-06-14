import React from 'react'

const User = ({ user }) => {
  return (
    <tr id={user.id} key={user.id} className='blog'>
      <td>{user.name}</td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

export default User