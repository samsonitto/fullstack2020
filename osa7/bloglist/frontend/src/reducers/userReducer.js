import userService from '../services/users'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    case 'USER':
      return action.data
    default:
      return state;
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const getUser = (id) => {
  return async dispatch => {
    const user = await userService.getOneUser(id)
    dispatch({
      type: 'USER',
      data: user
    })
  }
}

export default reducer