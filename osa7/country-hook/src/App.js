import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [countries, setCountries] = useState(['empty','lol'])
  const [found, setFound] = useState(false)
  useEffect(() => {
    console.log('effect')
    if(!name) {
      return undefined
    }
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then(response => {
        console.log('promise fulfilled')
        setFound(true)
        setCountry(response.data)
      })
      .catch(error => {
        console.log(error)
        setFound(false)
      })
    
  }, [countries])



  return { country, found, setCountries }
}

const Country = ({ country }) => {
  console.log(country);
  
  if (!country.country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.country[0].name} </h3>
      <div>capital {country.country[0].capital} </div>
      <div>population {country.country[0].population}</div> 
      <img src={country.country[0].flag} height='100' alt={`flag of ${country.country[0].name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
    country.setCountries(['lol'])
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App