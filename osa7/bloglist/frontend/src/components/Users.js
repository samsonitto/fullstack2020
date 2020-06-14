import React from 'react'
import Header2 from './Header2'
import { useSelector } from 'react-redux'
import User from './User'

const Users = () => {
  const users = useSelector(state => state.users)
  return (
    <div>
      <Header2 text="Users" />
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => 
            <>
              <User user={user} />
            </>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users