/* eslint-disable */
import React from 'react'
import { useSelector } from 'react-redux'
import Anecdote from './Anecdote'
import Notification from './Notification'

const Anecdotes = () => {
  const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())))

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