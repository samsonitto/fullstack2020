import blogService from '../services/blogs'
import commentService from '../services/comments'

const sortedState = (state) => {
  return state.sort((a, b) => (a.likes < b.likes ? 1 : -1))
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE':
      const id = action.data.id
      const likedBlog = state.find(b => b.id === id)
      return sortedState(state.map(b => b.id !== id ? b : likedBlog))

    case 'COMMENT':
      const commentedBlogId = action.data.savedComment.blog
      let commentedBlog = state.find(b => b.id === commentedBlogId)
      commentedBlog.comments.push(action.data.savedComment)
      console.log('commented blog', commentedBlog)
      
      return sortedState(state.map(b => b.id !== commentedBlogId ? b : commentedBlog))

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

export const addComment = (commentObj) => {
  return async dispatch => {
    const newComment = await commentService.comment(commentObj)
    console.log('newComment', newComment)
    
    dispatch({
      type: 'COMMENT',
      data: newComment
    })
  }
}

export default reducer