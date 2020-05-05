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
  return (
    <>
      <JustText text={props.texts[0]} amount={props.goodAmount}/>
      <JustText text={props.texts[1]} amount={props.neutralAmount}/>
      <JustText text={props.texts[2]} amount={props.badAmount}/>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const texts = ['Good','Neutral','Bad'];

  const addGood = () => {
    console.log("good");
    setGood(good + 1);
  }

  const addNeutral = () => {
    setNeutral(neutral + 1);
  }

  const addBad = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <Header text={'Give Feedback'}/>
      <Button handleClick={addGood} text={texts[0]} />
      <Button handleClick={addNeutral} text={texts[1]} />
      <Button handleClick={addBad} text={texts[2]} />
      <Header text={'Statistics'}/>
      <Stats texts={texts} goodAmount={good} neutralAmount={neutral} badAmount={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)