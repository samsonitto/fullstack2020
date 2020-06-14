import React from 'react'
import Header2 from './Header2'
import Button from './Button'

const BlogInfo = ({ blog, handleLikeClick }) => {
  return (
    <>
      <Header2 text={blog.title} />
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes <Button text='like' handleClick={() => handleLikeClick(blog)} /></p>
      <p>added by {blog.user.name}</p>
    </>
  )
}

export default BlogInfo