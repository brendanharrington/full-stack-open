import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null)

  const apiKey = import.meta.env.VITE_OPENWEATHER_KEY
  const lat = country.capitalInfo.latlng[0]
  const lon = country.capitalInfo.latlng[1]
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  let iconUrl = ''

  useEffect(() => {
    axios.get(weatherUrl)
      .then(response => setWeather(response.data))
      .catch(err => console.error('Weather fetch failed:', err))
  }, [weatherUrl])

  return (
    <div>
      <h2>{country.name.common} {country.flag}</h2>
      <p><b>Capital:</b> {country.capital}</p>
      <p><b>Area:</b> {country.area} km<sup>2</sup></p>
      <h3>Languages</h3>
      <ul>{Object.entries(country.languages).map(entry => <li key={entry[0]}>{entry[1]}</li>)}</ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h3>Weather in {country.capital}</h3>
      {!weather ? (
        <p>Loading weather...</p>
      ) : (
        <>
          <p><b>Temperature:</b> {weather.main.temp} °C</p>
          <p><b>Condition:</b> {weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p><b>Wind:</b> {weather.wind.speed} m/s</p>
        </>
      )}
    </div>
  )
}

export default CountryDetails