import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const handleClick = anecdote => {
    dispatch(voteAnecdote(anecdote))
    dispatch(showNotification(`You voted for "${anecdote.content}"`))
    setTimeout(() => {
      dispatch(showNotification(''))
    }, 5000)
  }

  return (
    <div>
      {anecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleClick(anecdote)}>vote</button>
            </div>
          </div>
      ))}
    </div>
  )
}

export default AnecdoteList