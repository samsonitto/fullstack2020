import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddNewBlog from '../components/AddNewBlog'

test('<AddNewBlog /> submits the right props', () => {
  const createBlog = jest.fn()

  const component = render(
    <AddNewBlog createBlog={createBlog} />
  )

  const inputTitle = component.container.querySelector('#titleInput0')
  const inputAuthor = component.container.querySelector('#authorInput0')
  const inputUrl = component.container.querySelector('#urlInput0')
  const button = component.getByText('Add')

  fireEvent.change(inputTitle, {
    target: { value: 'Testing the form' }
  })
  fireEvent.change(inputAuthor, {
    target: { value: 'Testi Testinen' }
  })
  fireEvent.change(inputUrl, {
    target: { value: 'https://test.com' }
  })
  fireEvent.click(button)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing the form')
  expect(createBlog.mock.calls[0][0].author).toBe('Testi Testinen')
  expect(createBlog.mock.calls[0][0].url).toBe('https://test.com')
})