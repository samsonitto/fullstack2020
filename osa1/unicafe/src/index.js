import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const JustText = (props) => <p>{props.text} {props.amount}</p>

const Header = (props) => <h1>{props.text}</h1>

const Stats = (props) => {
  if(!props.feedbackGiven){
    return(
      <p>No feedback given</p>
    )
  }

  return (
    <>
      <JustText text={props.texts[0]} amount={props.goodAmount}/>
      <JustText text={props.texts[1]} amount={props.neutralAmount}/>
      <JustText text={props.texts[2]} amount={props.badAmount}/>
      <JustText text={props.texts[3]} amount={props.all}/>
      <JustText text={props.texts[4]} amount={props.avg}/>
      <JustText text={props.texts[5]} amount={props.percentage}/>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [feedback, setFeedback] = useState(false)

  const texts = ['Good','Neutral','Bad','All','Average','Positive'];

  const addGood = () => {
    setFeedback(true);
    setGood(good + 1);
  }

  const addNeutral = () => {
    setFeedback(true);
    setNeutral(neutral + 1);
  }

  const addBad = () => {
    setFeedback(true);
    setBad(bad + 1);
  }

  const avg = (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad);

  let average = isNaN(avg) ? 0 : avg;

  let positive = (good / (good + neutral + bad)) * 100;

  let pos = isNaN(positive) ? 0 : positive;




  return (
    <div>
      <Header text={'Give Feedback'}/>
      <Button handleClick={addGood} text={texts[0]} />
      <Button handleClick={addNeutral} text={texts[1]} />
      <Button handleClick={addBad} text={texts[2]} />
      <Header text={'Statistics'}/>
      <Stats 
        feedbackGiven={feedback}
        texts={texts} 
        goodAmount={good} 
        neutralAmount={neutral} 
        badAmount={bad}
        all={good + neutral + bad}
        avg={average}
        percentage={pos + '%'}
         />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)