import CountryDetails from './CountryDetails'

const Countries = ({ countriesToShow }) => {
  if (countriesToShow.length > 10) {
    return <p>Too many matches. Specify another filter.</p>
  }

  if (countriesToShow.length === 1) {
    return <CountryDetails country={countriesToShow[0]} />
  }

  return (
    <ul>
      {countriesToShow.map(country => (
        <li key={country.name.common}>
          {country.name.common}
        </li>
      ))}
    </ul>
  )
}

export default Countries