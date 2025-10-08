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
      {countriesToShow.length > 10 
        ? <p>too many</p> 
        : countriesToShow.length === 1
          ? <div>
            <h2>{countriesToShow[0].name.common} {countriesToShow[0].flag}</h2>
            <p><b>Capital:</b> {countriesToShow[0].capital}</p>
            <p><b>Area:</b> {countriesToShow[0].area} km<sup>2</sup></p>
            <h3>Languages</h3>
            <ul>{Object.entries(countriesToShow[0].languages).map(entry => <li key={entry[0]}>{entry[1]}</li>)}</ul>
            <img src={countriesToShow[0].flags.png} alt={countriesToShow[0].flags.alt} />
          </div>
          : <ul>{countriesToShow.map(country => <li key={country.name.common}>{country.name.common}</li>)}</ul>}
    </div>
  )
}

export default App
