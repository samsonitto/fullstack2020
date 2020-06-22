  
import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const EDIT_YEAR = gql`
  mutation editAuthor($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year)  {
      name
      born
      id
    }
  }
`

const SetBirthYear = ({ ALL_AUTHORS, setError }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [ changeBirthYear ] = useMutation(EDIT_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      //setError(error.graphQLErrors[0].message)
      setError(error.message)      
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    changeBirthYear({ variables: { name, year }})

    setName('')
    setYear('')
  }

  return (
    <form onSubmit={submit}>
      <h2>Set birthyear</h2>
      <div>
        name
        <input
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      <div>
        birthyear
        <input
          value={year}
          onChange={({ target }) => setYear(Number(target.value))}
        />
      </div>
      
      <button type='submit'>update birthyear</button>
    </form>
  )
}

const Authors = ({ show, authors, ALL_AUTHORS, setError }) => {
  if (!show) {
    return null
  }
  //const authors = []

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <SetBirthYear ALL_AUTHORS={ALL_AUTHORS} setError={setError} />
    </div>
  )
}

export default Authors
