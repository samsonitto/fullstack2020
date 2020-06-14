import React from 'react'
import Togglable from './Togglable'
import Button from './Button'
import { Link } from 'react-router-dom'

const Blog = ({ blog, user, handleLikeClick, handleDeleteClick }) => {
  return (
    <tr id={blog.id} key={blog.id} className='blog'>
      <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
      <td>{blog.author}</td>
    </tr>
  )
}

export default Blog