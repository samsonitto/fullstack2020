import React from 'react'
import Togglable from './Togglable'
import Button from './Button'
import { Link } from 'react-router-dom'

const Blog = ({ blog, user, handleLikeClick, handleDeleteClick }) => {
  return (
    <tr id={blog.id} key={blog.id} className='blog'>
      <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
      <td>{blog.author}</td>
      <td>
        <Togglable buttonLabel={'View'} buttonHideLabel={'Hide Info'} idView={blog.title.trim()}>
          <div>
            <p>URL: {blog.url}</p>
            <p>Likes: {blog.likes} <Button text='like' handleClick={() => handleLikeClick(blog)} /></p>
            {blog.user ? <p>Added by: {blog.user.name}</p> : ''}
            {blog.user ? (user.username === blog.user.username ? <Button text='Delete Blog' id={(blog.title + blog.author).trim()} handleClick={() => handleDeleteClick(blog.id, blog.title)} /> : '') : ''}
          </div>
        </Togglable>
      </td>
    </tr>
  )
}

export default Blog