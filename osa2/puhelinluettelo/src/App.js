import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Filter from './components/Filter'
import AddNewContact from './components/AddNewContact'
import Contacts from './components/Contacts'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ personsToShow, setPersonsToShow] = useState(persons)
  const [ dataLoaded, setDataLoaded ] = useState(false)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setPersonsToShow(response.data)
      })
    
  }, [])
  console.log('render', persons.length, 'persons');
  

  const handleAddClick = (e) => {
    e.preventDefault()
    if(newName === '') {
      alert("Input Name")
    }
    else if (newNumber === '') {
      alert("Input Number")
    } else {
      let newObject = {
        name: newName,
        number: newNumber
      }
  
      if(persons.some(person => person.name === newName)) {
        alert(`${newName} is already in the phonebook`)
      } else {
        setPersons(persons.concat(newObject))
        setPersonsToShow(persons.concat(newObject))
        setNewName('')
        document.getElementById('nameInput0').value = ''
        document.getElementById('numberInput0').value = ''
      }
    }
  }

  const handleFilterOnChange = (e) => {
    const filtered = persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setPersonsToShow(filtered)
  }

  const handleAddOnChange = (e) => {
    setNewName(e.target.value)
  }

  const handleAddNumberOnChange = (e) => {
    setNewNumber(e.target.value)
  }

  return (
    <div>
      <Header text={'Phonebook'} />
      <Filter handleFilterOnChange={handleFilterOnChange} />
      <AddNewContact 
        handleAddOnChange={handleAddOnChange} 
        handleAddNumberOnChange={handleAddNumberOnChange}
        handleAddClick={handleAddClick}
      />
      <Contacts personsToShow={personsToShow} />
    </div>
  )
}

export default App