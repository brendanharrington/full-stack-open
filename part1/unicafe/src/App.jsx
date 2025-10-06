import { useState } from 'react'

const Header = () => <h1>Unicafe Feedback Application</h1>

const Subheader = ({text}) => <h2>{text}</h2>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  return text === "Positive:"
    ? (<p>{text} {value}%</p>)
    : (<p>{text} {value}</p>)
}

const Statistics = ({feedback}) => {
  const {good, neutral, bad} = feedback
  const sum = good + neutral + bad;
  const average = sum === 0 ? 0 : (good - bad) / sum
  const positive = good === 0 ? 0 : (good / sum) * 100

  return sum === 0 
    ? (<p>No feedback given</p>)
    : (
      <div>
        <StatisticLine text={'Good:'} value={good}/>
        <StatisticLine text={'Neutral:'} value={neutral}/>
        <StatisticLine text={'Bad:'} value={bad}/>
        <StatisticLine text={'All:'} value={sum}/>
        <StatisticLine text={'Average:'} value={average}/>
        <StatisticLine text={'Positive:'} value={positive}/>
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