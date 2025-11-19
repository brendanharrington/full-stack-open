import { useDispatch } from 'react-redux'
import { setFilter  } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = event => {
    dispatch(setFilter(event.target.value))
  }

  const style = {
    marginBottom: 20
  }

  return (
    <div style={style}>
      <label>
        filter
        <input type="text" onChange={handleChange} />
      </label>
    </div>
  )
}

export default Filter