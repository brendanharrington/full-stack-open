import { useState } from 'react'

const Header = () => <h1>Unicafe Feedback Application</h1>

const Subheader = ({text}) => <h2>{text}</h2>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistics = (props) => {
  return (
    <div>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
      <Header />
      <Subheader text={'Give Feedback'} />
      <Button text={'good'} onClick={incrementGood} />
      <Button text={'neutral'} onClick={incrementNeutral} />
      <Button text={'bad'} onClick={incrementBad} />
      <Subheader text={'Statistics'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App