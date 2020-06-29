  
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_YEAR } from './queries'

const SetBirthYear = ({ ALL_AUTHORS, setError, authors }) => {
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

  if(!authors) {
    return null
  }

  return (
    <form onSubmit={submit}>
      <h2>Set birthyear</h2>
      <div>
        name
        <select name="authors" id="authors" onChange={({ target }) => setName(target.value)}>
          {authors.map(a => 
            <option key={a.id} value={a.name}>{a.name}</option>
          )}
        </select>
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

const Authors = ({ show, authors, ALL_AUTHORS, setError, currentUser }) => {
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
              <td>{a.books.length}</td>
            </tr>
          )}
        </tbody>
      </table>
      {currentUser ? <SetBirthYear ALL_AUTHORS={ALL_AUTHORS} setError={setError} authors={authors} /> : ''}
    </div>
  )
}

export default Authors
