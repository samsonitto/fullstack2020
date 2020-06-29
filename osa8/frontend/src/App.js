
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ME, LOGIN } from './components/queries'
import LoginForm from './components/LoginForm'

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = ({ getToken }) => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState('')

  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
  const currentUser = useQuery(ME)

  console.log('me', currentUser.data)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const [ login ] = useMutation(LOGIN, {
    onError: (error) => {
      notify(error.message)
    }
  })

  const handleLogin = (username, password) => {
    login({ variables: { username, password }}).then(res => {
      console.log('token', res.data.login.value)
      setToken(res.data.login.value)
      localStorage.setItem('token', res.data.login.value)
    })
  }
  
  if (resultAuthors.loading || resultBooks.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {currentUser.data.me ? <button onClick={() => setPage('add')}>add book</button> : ''}
        
      </div>

      <Notify errorMessage={errorMessage} />

      {!currentUser.data.me ? 
        <LoginForm setError={notify} login={handleLogin} /> : 
        <strong>{currentUser.data.me.username} logged in!</strong>
      }

      <Authors
        show={page === 'authors'}
        authors={resultAuthors.data.allAuthors}
        ALL_AUTHORS={ALL_AUTHORS}
        setError={notify}
        currentUser={currentUser.data.me}
      />

      <Books
        show={page === 'books'}
        books={resultBooks.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
        ALL_AUTHORS={ALL_AUTHORS}
        ALL_BOOKS={ALL_BOOKS}
        setError={notify}
      />

    </div>
  )
}

export default App