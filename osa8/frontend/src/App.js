
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useMutation, useApolloClient } from '@apollo/client'
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
  const [token, setToken] = useState(null)
  const client = useApolloClient()

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

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      notify(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
    }
  }, [result.data])

  const handleLogin = (username, password) => {
    login({ variables: { username, password } })
  }

  const logout = (e) => {
    e.preventDefault()
    setToken(null)
    localStorage.clear()
    client.resetStore()
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
        {token ? <button onClick={logout}>logout</button> : ''}
        
      </div>

      <Notify errorMessage={errorMessage} />

      {!token ? 
        <LoginForm setError={notify} login={handleLogin} /> : 
        ''
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