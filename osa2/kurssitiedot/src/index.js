import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return(
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <>
      {props.course.parts.map(part => 
        <Part part={part.name} exercises={part.exercises} key={part.id} />
      )}
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p><b>Number of exercises {props.total}</b></p>
    </>
  )
}

const Course = (props) => {
  return (
    <>
      <Header course={props.course} />
      <Content
        course={props.course}
      />
      <Total
        total={props.total}
      />
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  let total = course.parts.map(part => part.exercises).reduce((a, b) => a + b, 0)

  return (
    <div>
      <Course course={course} total={total} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))