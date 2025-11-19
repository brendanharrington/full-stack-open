import CountryDetails from './CountryDetails'

const Countries = ({ countriesToShow, setFilter }) => {
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
          {country.name.common}{' '}
          <button onClick={() => setFilter(country.name.common.toLowerCase())}>
            Show
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Countries