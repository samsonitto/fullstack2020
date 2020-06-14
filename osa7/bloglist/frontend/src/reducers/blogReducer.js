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
      const likedBlog = state.find(b => b.id === id)
      return sortedState(state.map(b => b.id !== id ? b : likedBlog))

    case 'NEW':
      return sortedState([...state, action.data.savedBlog])
      
    case 'INIT_BLOGS':
      return action.data
      
    case 'DELETE':
      const dletedId = action.data.id
      return sortedState(state.filter(b => b.id !== dletedId))
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

export const likeBlog = (blog, id) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog, id)
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
    
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    const deletedBlog = await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE',
      data: deletedBlog
    })
    
  }
}

export default reducer