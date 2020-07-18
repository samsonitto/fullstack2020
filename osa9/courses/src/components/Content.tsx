import React from "react";

interface Courses {
  name: string,
  exerciseCount: number
}

const Content: React.FC<{ courses: Array<Courses> }> = ({ courses }) => {
  return (
    <>
      {courses.map( course => <p>{course.name} {course.exerciseCount}</p>)}
    </>
  )
}

export default Content