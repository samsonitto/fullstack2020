import React from 'react'
import Header2 from './Header2'

const UserInfo = ({ user }) => {
  return (
    <div>
      <Header2 text={user.name} />
      <h3>Added Blogs</h3>
      {user.blogs.map((blog, i) => 
        <li>{blog.title}</li>
      )}
    </div>
  )
}

export default UserInfo