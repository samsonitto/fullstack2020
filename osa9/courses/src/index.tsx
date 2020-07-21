import React from "react";
import ReactDOM from "react-dom";
import Header from './components/Header'
import Content from "./components/Content";
import Total from "./components/Total";
import { CoursePart } from "./types";
import './index.css';

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  
  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "The Joe Rogan Experience",
      exerciseCount: 20,
      description: "Ufc, comedy, bow hunting, meditation"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));