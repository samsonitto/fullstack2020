import React from 'react'
import Header2 from './Header2'
import Button from './Button'
import CommentForm from './CommentForm'
import { ListGroup } from 'react-bootstrap'

const BlogInfo = ({ blog, user, handleLikeClick, handleDeleteClick, showMessage }) => {
  const style = {
    background: 'lightgray'
  }
  const liStyle = {
    background: 'lightgray'
  }
  if(!blog || !user) {
    return null
  }
  return (
    <>
      <Header2 text={blog.title} />
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes 
        <Button className='ml-2' text='like' handleClick={() => handleLikeClick(blog)} />
        {blog.user ? (user.username === blog.user.username ? <Button className='ml-2' text='Delete Blog' id={(blog.title + blog.author).trim()} handleClick={() => handleDeleteClick(blog.id, blog.title)} /> : '') : ''}
      </p>
      {blog.user ? <p>added by {blog.user.name}</p> : ''}
      <div className="col p-1" style={style}>
        <h3>Comments</h3>
        <CommentForm blog={blog} showMessage={showMessage} />
        {blog.comments.length === 0
          ? <p>This blog has no comments</p>
          : <ListGroup className="mt-2" style={liStyle}>{blog.comments.map((comment, i) => <ListGroup.Item key={i}>{comment.comment}</ListGroup.Item>)}</ListGroup>
        }
      </div>
    </>
  )
}

export default BlogInfo