import blogService from '../services/blogs'

const sortedState = (state) => {
  return state.sort((a, b) => (a.likes < b.likes ? 1 : -1))
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'LIKE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      return sortedState(state.map(a => a.id !== id ? a : anecdoteToVote))

    case 'NEW':
      return sortedState([...state, action.data.savedBlog])
      
    case 'INIT_BLOGS':
      return action.data
    default:
      return state;
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: sortedState(blogs)
    })
  }
}

export const addBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW',
      data: newBlog
    })
  }
}

/* export const voteFor = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'LIKE',
      data: updatedAnecdote
    })
    
  }
} */

export default reducer