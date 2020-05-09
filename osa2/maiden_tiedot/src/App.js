import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Input from './components/Input'
import CountryList from './components/CountryList'

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ countriesToShow, setCountriesToShow] = useState([])
  const [ countryInfo, setCountryInfo] = useState([])

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

  return (
    <div>
      Input Country <Input placeholder={"Country.."} handleOnChange={handleFilterOnChange} />
      <CountryList countries={countriesToShow} handleOnClick={getOneCountry} />
    </div>
  )
}

export default App