const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_FILTER': {
      return action.payload
    }
    default:
      return state
  }
}

export const setFilter = filter => {
  return { type: 'UPDATE_FILTER', payload: filter }
}

export default filterReducer