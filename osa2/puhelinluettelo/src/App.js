import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Filter from './components/Filter'
import AddNewContact from './components/AddNewContact'
import Contacts from './components/Contacts'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ personsToShow, setPersonsToShow] = useState(persons)

  useEffect(() => {
    personService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
        setPersonsToShow(initialContacts)
      })
      .catch(error => {
        alert(`Error caught: ${error}`)
      })
    
  }, [])
  

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
        let message = `${newName} is already in the phonebook. Do you want to replace the old number with a new one?`
        if(window.confirm(message)) {
          const per = persons.find(p => p.name === newName)
          const changedContact = { ...per, number: newNumber}

          personService
            .update(per.id, changedContact)
            .then(returnedContact => {
              setPersons(persons.map(person => person.id !== per.id ? person : returnedContact))
              setPersonsToShow(persons.map(person => person.id !== per.id ? person : returnedContact))
              resetForm()
            })
            .catch(error => {
              alert(`Error caught: ${error}`)
            })
        }
      } else {
        personService
          .create(newObject)
          .then(returnedContact => {
            setPersons(persons.concat(returnedContact))
            setPersonsToShow(persons.concat(returnedContact))
            
            resetForm()
          })
          .catch(error => {
            alert(`Error caught: ${error}`)
          })
      }
    }
  }

  const handleDeleteClick = (id, name) => {
    console.log(id);
    let message = `Do you really want to delete ${name}?`
    if(window.confirm(message)){
      personService
        .deleteContact(id)
        .then(res => {
          setPersons(persons.filter(p => p.id !== id))
          setPersonsToShow(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          alert(`Error caught: ${error}`)
        })
    }
  }

  const resetForm = () => {
    setNewName('')
    setNewNumber('')
    document.getElementById('nameInput0').value = ''
    document.getElementById('numberInput0').value = ''
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
      <Contacts personsToShow={personsToShow} handleDeleteClick={handleDeleteClick} />
    </div>
  )
}

export default App