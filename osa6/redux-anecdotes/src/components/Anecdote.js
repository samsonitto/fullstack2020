/* eslint-disable */
import React from 'react'
import { useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { notificationChange } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(voteFor(anecdote))
    dispatch(notificationChange(`You voted for ${anecdote.content}`))
    setTimeout(() => {
      dispatch(notificationChange(''))
    }, 5000)
  }

  return (
    <div>
      <div key={anecdote.id}>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

export default Anecdote