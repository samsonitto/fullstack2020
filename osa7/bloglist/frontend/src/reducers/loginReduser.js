import blogService from '../services/blogs'
import loginService from '../services/login'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'LOGGED_IN':
      return action.data
    case 'LOGIN':
      return action.data
    default:
      return state;
  }
}

export const loggedIn = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGGED_IN',
        data: user
      })
    }
  }
}

export const loginChange = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password,
    })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.clear()
    dispatch({
      type: 'LOGGED_IN',
      data: null
    })
  }
}

export default reducer