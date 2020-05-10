import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Input from './components/Input'
import CountryList from './components/CountryList'

console.log('API',process.env.REACT_APP_WEATHER_API_KEY);


const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ countriesToShow, setCountriesToShow] = useState([])
  const [ weather, setWeather ] = useState({})

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
    
  }, [])



  const getOneCountry = (countryName) => {
      const filtered = countries.filter(country => country.name.toLowerCase().includes(countryName.toLowerCase()))
      setCountriesToShow(filtered)
  }

  const handleFilterOnChange = (e) => {
    if(e.target.value) {
      const filtered = countries.filter(country => country.name.toLowerCase().includes(e.target.value.toLowerCase()))
      setCountriesToShow(filtered)
    }
    else if(e.target.value === '') {
      setCountriesToShow([])
    }
    
  }

  console.log(weather);
  

  return (
    <div>
      Input Country <Input placeholder={"Country.."} handleOnChange={handleFilterOnChange} />
      <CountryList weather={weather} countries={countriesToShow} getCountryInfo={getOneCountry} />
    </div>
  )
}

export default App