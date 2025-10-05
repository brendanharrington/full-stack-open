import { useState } from 'react'

const Header = () => <h1>Unicafe Feedback Application</h1>

const Subheader = ({text}) => <h2>{text}</h2>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = ({feedback}) => {
  const {good, neutral, bad} = feedback
  return (
    <div>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </div>
  )
}

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 })

  const handleFeedback = (type) => { 
    setFeedback({
      ...feedback, [type]: feedback[type] + 1
    })
  }

  return (
    <div>
      <Header />
      <Subheader text={'Give Feedback'} />
      <Button text='Good' onClick={() => handleFeedback('good')} />
      <Button text='Neutral' onClick={() => handleFeedback('neutral')} />
      <Button text='Bad' onClick={() => handleFeedback('bad')} />
      <Subheader text={'Statistics'} />
      <Statistics feedback={feedback} />
    </div>
  )
}

export default App