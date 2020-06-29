import React, { useState, useEffect } from 'react'

const Books = ({ show, books, handleGenreClick, genres }) => {

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map((g, i) => 
        <button key={i} onClick={() => handleGenreClick(g)}>{g}</button>
      )}
      <button onClick={() => handleGenreClick('all')}>All</button>
    </div>
  )
}

export default Books