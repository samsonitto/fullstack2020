import anecdoteService from '../services/anecdotes'

const sortedState = (state) => {
  return state.sort((a, b) => (a.votes < b.votes ? 1 : -1))
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      return sortedState(state.map(a => a.id !== id ? a : anecdoteToVote))

    case 'NEW':
      return sortedState([...state, action.data])
      
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state;
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: sortedState(anecdotes)
    })
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote
    })
    
  }
}

export const voteFor = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
    
  }
}

export default reducer