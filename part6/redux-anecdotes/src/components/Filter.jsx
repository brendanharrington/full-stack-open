import { useDispatch } from 'react-redux'
import { setFilter  } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = event => {
    dispatch(setFilter(event.target.value))
  }

  return (
    <div>
      <label>
        filter
        <input type="text" onChange={handleChange} />
      </label>
    </div>
  )
}

export default Filter