/* eslint-disable */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Anecdote from './Anecdote'
import Notification from './Notification'

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  console.log(anecdotes)

  return (
    <>
      <Notification />
        {anecdotes.map(a => 
          <>
            <hr />
            <Anecdote anecdote={a} />
          </>
        )}
        <hr />
    </>
  )
}
export default Anecdotes