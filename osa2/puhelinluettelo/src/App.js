import React, { useState } from 'react'
import PlainText from './components/PlainText'
import Header from './components/Header'
import Filter from './components/Filter'
import AddNewContact from './components/AddNewContact'
import Contacts from './components/Contacts'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ personsToShow, setPersonsToShow] = useState(persons)

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