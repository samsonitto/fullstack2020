import React from 'react'

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

export default Course;