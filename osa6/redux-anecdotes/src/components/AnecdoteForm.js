import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const createAnecdote = async (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(addAnecdote(newAnecdote))
    dispatch(notificationChange(`You have added "${newAnecdote.content}"`))
    setTimeout(() => {
      dispatch(notificationChange(''))
    }, 5000)
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

export default AnecdoteForm