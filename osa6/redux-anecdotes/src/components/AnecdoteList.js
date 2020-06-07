/* eslint-disable */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)
  console.log(anecdotes)

  return (
    <>
        {anecdotes.map(a => 
          <>
            <hr />
            <Anecdote anecdote={a} handleClick={() => dispatch(voteFor(a.id))} />
          </>
        )}
        <hr />
    </>
  )
}
export default Anecdotes