const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common} {country.flag}</h2>
      <p><b>Capital:</b> {country.capital}</p>
      <p><b>Area:</b> {country.area} km<sup>2</sup></p>
      <h3>Languages</h3>
      <ul>{Object.entries(country.languages).map(entry => <li key={entry[0]}>{entry[1]}</li>)}</ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  )
}

export default CountryDetails