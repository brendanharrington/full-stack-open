import { useState, useEffect } from 'react'
import axios from 'axios'

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
      <div>
        <label htmlFor="filter">Find countries: </label>
        <input type="text" name="filter" id="filter" onChange={handleFilterChange} />
      </div>
      <p>filter: {filter}</p>
      <p>num countries to show: {countriesToShow.length}</p>
      {countriesToShow.length > 10 
        ? <p>too many</p> 
        : countriesToShow.length === 1
          ? <p>{countriesToShow[0].name.common}</p>
          : <ul>{countriesToShow.map(country => <li key={country.name.common}>{country.name.common}</li>)}</ul>}
    </div>
  )
}

export default App
