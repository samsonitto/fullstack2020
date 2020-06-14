import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Filter from './components/Filter'
import AddNewBlog from './components/AddNewBlog'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Button from './components/Button'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import './App.css'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { notificationChange } from "./reducers/notificationReducer"



const App = () => {
  const [ blogs, setBlogs] = useState([])
  const [ newLike, setNewLike ] = useState('')
  const [ blogsToShow, setBlogsToShow] = useState(blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1)))
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
        console.log(initialBlogs)
        setBlogsToShow(initialBlogs)
      })
      .catch(error => {
        showMessage(`Error caught: ${error}`, 'error')
      })
    
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log(user)
      
    }
  }, [])

  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      showMessage('wrong credentials', 'error')
    }
  }

  const handleLogout = () => {
    console.log('logging out')
    setUser(null)
    window.localStorage.clear()
  }
  

  const handleAddClick = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog.savedBlog))
      setBlogsToShow(blogs.concat(newBlog.savedBlog))
      showMessage(`Added ${newBlog.savedBlog.title}`, 'success')
      resetForm()
      
    } catch (error) {
      showMessage(error, 'error')
    }

  }

  const handleDeleteClick = async (id, title) => {
    let message = `Do you really want to delete ${title}?`
    if(window.confirm(message)){
      try {
        const deletedBlog = await blogService.deleteBlog(id)
        
        setBlogs(blogs.filter(b => b.id !== id))
        setBlogsToShow(blogs.filter(b => b.id !== id))
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

    blogService
      .update(updatedObject, blog.id)
      .then(() => {
        setBlogs(blogs)
        showMessage(`You liked ${updatedObject.title}`, 'success')
      })
      .catch(error => {
        showMessage(error, 'error')
      })
  }

  const resetForm = () => {
    setNewLike('')
    document.getElementById('titleInput0').value = ''
    document.getElementById('authorInput0').value = ''
    document.getElementById('urlInput0').value = ''
  }

  const showMessage = (msg, msgClass) => {
    dispatch(notificationChange({ msg, msgClass }, 5))
  }

  const handleFilterOnChange = (e) => {
    const filtered = blogs.filter(blog => blog.title.toLowerCase().includes(e.target.value.toLowerCase()))
    setBlogsToShow(filtered)
  }

  const blogFormRef = React.createRef()

  if (user === null) {
    return (
      <div>
        <Header text={'Bloglist'} />
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
      <Header text={'Bloglist'} />
      <Notification />
      <p>{user.name} logged in</p><Button text={"logout"} handleClick={handleLogout} />
      <Togglable buttonLabel={'New Blog'} ref={blogFormRef} buttonHideLabel={'Cancel'}>
        <AddNewBlog 
          createBlog={handleAddClick}
          showMessage={showMessage}
        />
      </Togglable>
      <Filter handleFilterOnChange={handleFilterOnChange} />
    
      <Blogs blogs={blogsToShow} handleDeleteClick={handleDeleteClick} handleLikeClick={handleLikeClick} user={user} />      
    </div>
  )
}

export default App