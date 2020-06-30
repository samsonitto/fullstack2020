
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useMutation, useApolloClient, useLazyQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ME, LOGIN } from './components/queries'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

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
  const [books, setBooks] = useState([])
  const [booksToShow, setBooksToShow] = useState([])
  const [recommendedBooks, setRecommendedBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState([])

  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
  const currentUser = useQuery(ME)
  const filteredBooks = useQuery(ALL_BOOKS, { variables: { genre: currentUser.data ? currentUser.data.me.favoriteGenre : null } })
  const filteredByGenre = useQuery(ALL_BOOKS, selectedGenre.length > 0 ? { variables: { genre: selectedGenre[0] } } : undefined)

  useEffect(() => {
    if(resultBooks.data){
      setBooks(resultBooks.data.allBooks)
      setBooksToShow(resultBooks.data.allBooks)
      let gen = []
      resultBooks.data.allBooks.forEach(book => {
        book.genres.forEach(genre => {
          if(!gen.includes(genre)) {
            gen.push(genre)
          }
        })
      })
      setGenres(gen)
    }
  }, [resultBooks.data])

  useEffect(() => {
    if(currentUser.data && filteredBooks.data) {
      console.log('filtered', filteredBooks.data)
      setRecommendedBooks(filteredBooks.data.allBooks)
    }
  }, [filteredBooks.data])

  useEffect(() => {
    setBooksToShow(filteredByGenre.data ? filteredByGenre.data.allBooks : [])
    console.log('filteredByGenre', filteredByGenre.data)
    
  }, [selectedGenre])

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
    setPage('authors')
  }

  const logout = (e) => {
    e.preventDefault()
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const handleGenreClick = (genre) => {
    if (genre === 'all') {
      setBooksToShow(books)
    } else {
      setSelectedGenre([genre])
    }
    console.log('selected', selectedGenre);
    
  }
  
  if (resultAuthors.loading || resultBooks.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {currentUser.data.me ? 
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
          </>
           : 
          ''
        }
        {currentUser.data.me ? 
          <button onClick={logout}>logout</button> : 
          <button onClick={() => setPage('login')}>login</button>
        }
        
      </div>

      <Notify errorMessage={errorMessage} />

      <LoginForm 
        show={page === 'login'}
        setError={notify} 
        login={handleLogin} />

      <Authors
        show={page === 'authors'}
        authors={resultAuthors.data.allAuthors}
        ALL_AUTHORS={ALL_AUTHORS}
        setError={notify}
        currentUser={currentUser.data.me}
      />

      <Books
        show={page === 'books'}
        books={booksToShow}
        handleGenreClick={handleGenreClick}
        genres={genres}
      />

      <NewBook
        show={page === 'add'}
        ALL_AUTHORS={ALL_AUTHORS}
        ALL_BOOKS={ALL_BOOKS}
        setError={notify}
      />

      <Recommend 
        show={page === 'recommend'} 
        recommendedBooks={recommendedBooks}
      />

    </div>
  )
}

export default App