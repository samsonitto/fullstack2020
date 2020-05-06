import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Header2 = (props) => <h2>{props.course.name}</h2>

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
      <Header2 course={props.course} />
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
  const courses = [
    {
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  //let total = course.parts.map(part => part.exercises).reduce((a, b) => a + b, 0)

  return (
    <div>
      <Header text={'Web Development Curriculum'} />
      {courses.map(course => 
        <Course key={course.id} course={course} total={course.parts.map(part => part.exercises).reduce((a, b) => a + b, 0)} />
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))