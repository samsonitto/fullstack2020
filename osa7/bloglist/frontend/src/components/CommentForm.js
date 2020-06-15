import React, { useState } from 'react'
import Input from './Input'
import Button from './Button'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer';

const CommentForm = ({ blog, showMessage }) => {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const handleOnCommentChange = (e) => {
    setComment(e.target.value)
  }
  const createComment = (e) => {
    e.preventDefault()
    if (!comment) {
      showMessage("Can't add an empty comment", 'error')
      return
    }

    const newComment = {
      comment: comment,
      blog: blog.id
    }

    dispatch(addComment(newComment))
    showMessage(`You have commented on ${blog.title}`, 'success')
    document.getElementById('commentInput').value = ''
    setComment('')
  }

  return (
    <>
      <form>
        <Input id={'commentInput'} placeholder={'Write a comment'} name={'comm'} handleOnChange={handleOnCommentChange} />
        <Button text={'Add Comment'} handleClick={createComment} />
      </form>
    </>
  )
}

export default CommentForm