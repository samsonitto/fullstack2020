import React from 'react'
import Header2 from './Header2'
import Button from './Button'

const BlogInfo = ({ blog, user, handleLikeClick, handleDeleteClick }) => {
  return (
    <>
      <Header2 text={blog.title} />
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes 
        <Button text='like' handleClick={() => handleLikeClick(blog)} />
        {blog.user ? (user.username === blog.user.username ? <Button text='Delete Blog' id={(blog.title + blog.author).trim()} handleClick={() => handleDeleteClick(blog.id, blog.title)} /> : '') : ''}
      </p>
      {blog.user ? <p>added by {blog.user.name}</p> : ''}
    </>
  )
}

export default BlogInfo