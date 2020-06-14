import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from '../reducers/blogReducer'
import notificationReducer from '../reducers/notificationReducer'
import filterReducer from '../reducers/filterReducer'
import loginReducer from '../reducers/loginReduser'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  filter: filterReducer,
  loggedUser: loginReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store