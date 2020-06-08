import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
  //const dispatch = useDispatch()

  const createAnecdote = async (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    props.addAnecdote(anecdote)
    props.notificationChange(`You have added "${anecdote}"`, 5)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name='anecdote' /></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default connect(
  null,
  { addAnecdote, notificationChange }
)(AnecdoteForm)