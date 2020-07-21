import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";


const Content: React.FC<{ courses: Array<CoursePart> }> = ({ courses }) => {
  return (
    <>
      <table>
        <thead>
          <th>Name</th>
          <th>Exercise count</th>
          <th>Description</th>
          <th>Group Project Count</th>
          <th>Exercise Submission Link</th>
        </thead>
        <Part courses={courses} />
      </table>
    </>
  )
}

export default Content