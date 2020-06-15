import commentService from '../services/comments'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'COMMENT':
      return [...state, action.data.savedComment]
    default:
      return state;
  }
}

export const addComment = (commentObj) => {
  return async dispatch => {
    const newComment = await commentService.comment(commentObj)
    console.log(newComment)
    
    dispatch({
      type: 'COMMENT',
      data: newComment
    })
  }
}

export default reducer