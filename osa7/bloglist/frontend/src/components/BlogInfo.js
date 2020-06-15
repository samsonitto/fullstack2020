import React from 'react'
import Header2 from './Header2'
import Button from './Button'
import CommentForm from './CommentForm'

const BlogInfo = ({ blog, user, handleLikeClick, handleDeleteClick, showMessage }) => {
  if(!blog || !user) {
    return null
  }
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
      <h3>Comments</h3>
      <CommentForm blog={blog} showMessage={showMessage} />
      {blog.comments.length === 0
        ? <p>This blog has no comments</p>
        : <>{blog.comments.map((comment, i) => <li key={i}>{comment.comment}</li>)}</>
      }
    </>
  )
}

export default BlogInfo