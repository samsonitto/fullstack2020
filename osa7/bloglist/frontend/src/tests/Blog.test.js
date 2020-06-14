import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

const blog = {
  title: "Cat Science",
  author: "Neil Degrasse Tyson",
  url: "https://cats.com",
  likes: 2,
  date: "2020-05-27T13:53:40.041Z",
  id: "5ec256fa0cf72c4ad0a3347a",
}

test('renders content', () => {
  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Cat Science'
  )

  expect(component.container).toHaveTextContent(
    'Neil Degrasse Tyson'
  )

  const div = component.container.querySelector('.togglableContent')

  expect(div).toHaveTextContent(
    'https://cats.com'
  )
  expect(div).toHaveTextContent(
    '2'
  )
  expect(div).toHaveStyle('display: none')
})

test('renders hidden content', () => {
  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('View')
  fireEvent.click(button)

  const div = component.container.querySelector('.togglableContent')

  expect(div).toHaveTextContent(
    'https://cats.com'
  )
  expect(div).toHaveTextContent(
    '2'
  )
  expect(div).not.toHaveStyle('display: none')
})

test('clicking the button twice calls the event twice', () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleLikeClick={mockHandler} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})