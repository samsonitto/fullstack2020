import React from 'react';
import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ courses: Array<CoursePart> }> = ({ courses }) => {
  return (
    <>
      <tbody>
        {courses.map(course => {
          switch (course.name) {
            case "Fundamentals":
              return (
                <tr>
                  <td>{course.name}</td>
                  <td>{course.exerciseCount}</td>
                  <td>{course.description}</td>
                  <td></td>
                  <td></td>
                </tr>
              )
            case "Using props to pass data":
              return (
                <tr>
                  <td>{course.name}</td>
                  <td>{course.exerciseCount}</td>
                  <td></td>
                  <td>{course.groupProjectCount}</td>
                  <td></td>
                </tr>
              )

            case "Deeper type usage":
              return (
                <tr>
                  <td>{course.name}</td>
                  <td>{course.exerciseCount}</td>
                  <td>{course.description}</td>
                  <td></td>
                  <td>{course.exerciseSubmissionLink}</td>
                </tr>
              )

            case "The Joe Rogan Experience":
              return (
                <tr>
                  <td>{course.name}</td>
                  <td>{course.exerciseCount}</td>
                  <td>{course.description}</td>
                  <td></td>
                  <td></td>
                </tr>
              )

            default:
              return assertNever(course)
          }
        })}
      </tbody>
    </>
  )
}

export default Part