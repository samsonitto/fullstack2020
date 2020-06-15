import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from '../reducers/blogReducer'
import notificationReducer from '../reducers/notificationReducer'
import filterReducer from '../reducers/filterReducer'
import loginReducer from '../reducers/loginReduser'
import userReducer from '../reducers/userReducer'
import commentReducer from '../reducers/commentReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  filter: filterReducer,
  loggedUser: loginReducer,
  users: userReducer,
  comment: commentReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store