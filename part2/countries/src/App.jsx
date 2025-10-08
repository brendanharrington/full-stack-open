import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
  const countriesToShow = filter
    ? countries.filter(country => country.name.common.toLowerCase().includes(filter))
    : countries

  useEffect(() => {
    axios
      .get(baseUrl + 'api/all')
      .then(response => setCountries(response.data))
  }, [])
  
  const handleFilterChange = event => setFilter(event.target.value.toLowerCase())

  return (
    <div>
      <h1>Countries Application</h1>
      <Filter handleFilterChange={handleFilterChange} />
      <Countries countriesToShow={countriesToShow} />
    </div>
  )
}

export default App
