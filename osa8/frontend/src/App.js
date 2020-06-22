
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
      id
      genres
    }
  }
`

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

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)

  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)

  if (resultAuthors.loading || resultBooks.loading) {
    return <div>Loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
        authors={resultAuthors.data.allAuthors}
        ALL_AUTHORS={ALL_AUTHORS}
        setError={notify}
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