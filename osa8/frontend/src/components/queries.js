import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
      born
      id
    }
    id
    genres
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      books {
        title
        published
        id
      }
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks (genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String]!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const EDIT_YEAR = gql`
  mutation editAuthor($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year)  {
      name
      born
      id
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`