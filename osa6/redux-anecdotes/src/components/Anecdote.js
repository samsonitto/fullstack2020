/* eslint-disable */
import React from 'react'

const Anecdote = ({ anecdote, handleClick }) => {

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