import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Filter from './components/Filter'
import AddNewBlog from './components/AddNewBlog'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Button from './components/Button'
import LoginForm from './components/LoginForm'
import './App.css'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { notificationChange } from "./reducers/notificationReducer"
import { filterChange } from './reducers/filterReducer'
import { addBlog, likeBlog, initializeBlogs, deleteBlog } from './reducers/blogReducer'
import { loggedIn, loginChange, logout } from './reducers/loginReduser'
import Users from './components/Users'
import { initializeUsers } from './reducers/userReducer'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'
import NavBar from './components/NavBar'



const App = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])
  
  useEffect(() => {
    dispatch(loggedIn())
  }, [])
  
  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const blogs = useSelector(state => state.blogs.filter(blog => blog.title.toLowerCase().includes(state.filter.toLowerCase())))

  const user = useSelector(state => state.loggedUser)
  const users = useSelector(state => state.users)

  const match = useRouteMatch('/users/:id')
  
  const userInfo = match ? users.find(user => user.id === match.params.id) : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const blogInfo = matchBlog ? blogs.find(blog => blog.id === matchBlog.params.id) : null

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      dispatch(loginChange(username, password))
      setUsername('')
      setPassword('')
    } catch (error) {
      showMessage('wrong credentials', 'error')
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }
  

  const handleAddClick = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(addBlog(blogObject))
      showMessage(`Added ${blogObject.title}`, 'success')
      resetForm()
      
    } catch (error) {
      showMessage(error, 'error')
    }

  }

  const handleDeleteClick = async (id, title) => {
    let message = `Do you really want to delete ${title}?`
    if(window.confirm(message)){
      try {
        dispatch(deleteBlog(id))
        showMessage(`The "${title}" blog has beed deleted`, 'neutral')
      } catch (error) {
        showMessage(error, 'error')
      }
    }
  }

  const handleLikeClick = (blog) => {

    console.log(blog)
    
    const updatedObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes += 1,
      user: blog.user ? blog.user.id : undefined,
    }    

    try {
      dispatch(likeBlog(updatedObject, blog.id))
      showMessage(`You liked ${updatedObject.title}`, 'success')
    } catch (error) {
      showMessage(`Error: ${error}`, 'error')
    }
  }

  const resetForm = () => {
    document.getElementById('titleInput0').value = ''
    document.getElementById('authorInput0').value = ''
    document.getElementById('urlInput0').value = ''
  }

  const showMessage = (msg, msgClass) => {
    dispatch(notificationChange({ msg, msgClass }, 5))
  }

  const handleFilterOnChange = (e) => {
    dispatch(filterChange(e.target.value))
  }

  const blogFormRef = React.createRef()

  if (user === null) {
    return (
      <div>
        <Header text={'Blog App'} />
        <Notification />
        <Togglable buttonLabel={'Login'} buttonHideLabel={'Cancel'}>
          <LoginForm 
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername} 
            password={password}
            setPassword={setPassword}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <NavBar user={user} handleLogout={handleLogout} />
      <Header text={'Blog App'} />
      <Notification />
      
      <Switch>
        <Route path="/users/:id">
          <UserInfo user={userInfo} />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:id">
          <BlogInfo 
            blog={blogInfo} 
            user={user} 
            handleLikeClick={handleLikeClick} 
            handleDeleteClick={handleDeleteClick} 
            showMessage={showMessage} 
          />
        </Route>
        <Route path="/">
          <Blogs 
            blogs={blogs} 
            handleDeleteClick={handleDeleteClick} 
            handleLikeClick={handleLikeClick} 
            user={user} 
            handleFilterOnChange={handleFilterOnChange} 
            handleAddClick={handleAddClick}
            showMessage={showMessage}
          />
        </Route>
      </Switch>

    </div>
  )
}

export default App