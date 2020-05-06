import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => <button onClick={props.handleClick} >{props.text}</button>
const Header = (props) => <h1>{props.text}</h1>
const TextLine = (props) => <p>{props.text}</p>

const MostVotes = (props) => {
  if(!props.votes) {
    return (
      <></>
    )
  }

  return (
    <>
      <Header text={'Anecdote with most votes'}/>
      <TextLine text={props.mostVotesAnecdote} />
      <TextLine text={props.textVoteAmount} />
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * 6))
  const [points, setPoints] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0));
  const [max, setMax] = useState(0)
  const [votes, setVotes] = useState(false)

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * 6))
  }

  const voteAnecdote = () => {
    const copy =  [...points] 
    copy[selected] += 1
    setPoints(copy)

    setMax(indexOfMax(copy))
    setVotes(true)
  }

  const indexOfMax = (arr) => {
    if (arr.length === 0) {
      return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
  }

  let voteText = points[selected] === 1 ? 'vote' : 'votes'
  let mostText = "Has " + points[max] + " votes"

  return (
    <div>
      <Header text={'Anecdote of the Day'} />
      <TextLine text={anecdotes[selected]} />
      <p>Has {points[selected]} {voteText}</p>
      <Button handleClick={voteAnecdote} text={'Vote'} />
      <Button handleClick={nextAnecdote} text={'Next Anecdote'} />
      <MostVotes mostVotesAnecdote={anecdotes[max]} textVoteAmount={mostText} votes={votes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)