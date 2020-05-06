import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => <td>{props.text}</td>

const Header = (props) => <h1>{props.text}</h1>

const Stats = (props) => {
  if(!props.feedbackGiven){
    return(
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <tbody>
        <tr>
          <StatisticLine text={props.texts[0]} />
          <StatisticLine text={props.goodAmount} />
        </tr>
        <tr>
          <StatisticLine text={props.texts[1]} />
          <StatisticLine text={props.neutralAmount} />
        </tr>
        <tr>
          <StatisticLine text={props.texts[2]} />
          <StatisticLine text={props.badAmount} />
        </tr>
        <tr>
          <StatisticLine text={props.texts[3]} />
          <StatisticLine text={props.all} />
        </tr>
        <tr>
          <StatisticLine text={props.texts[4]} />
          <StatisticLine text={props.avg} />
        </tr>
        <tr>
          <StatisticLine text={props.texts[5]} />
          <StatisticLine text={props.percentage} />
        </tr>
      </tbody>
    </table>
  )
}

const App = () => {
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