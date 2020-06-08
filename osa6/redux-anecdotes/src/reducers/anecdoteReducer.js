import anecdoteService from '../services/anecdotes'

const sortedState = (state) => {
  return state.sort((a, b) => (a.votes < b.votes ? 1 : -1))
}

//const initialState = sortedState(anecdotesAtStart.map(asObject))

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes += 1
      }
      return sortedState(state.map(a => a.id !== id ? a : changedAnecdote))

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
      data: anecdotes
    })
  }
}

export const addAnecdote = (data) => {
  return {
    type: 'NEW',
    data,
  }
}

export const voteFor = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default reducer