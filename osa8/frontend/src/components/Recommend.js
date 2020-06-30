import React from 'react'

const Recommend = ({ recommendedBooks, show }) => {
  if (!show) {
    return null
  }

  return (
    <div>
      <h3>Recommendations</h3>
      <p>Books in your favorite genre <strong>patterns</strong></p>
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
          {recommendedBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend