import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Filter from './components/Filter'
import AddNewContact from './components/AddNewContact'
import Contacts from './components/Contacts'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ personsToShow, setPersonsToShow] = useState(persons)
  const [ message, setMessage] = useState(null)
  const [ notClass, setNotClass] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
        setPersonsToShow(initialContacts)
      })
      .catch(error => {
        showMessage(`Error caught: ${error}`, 'error')
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
              showMessage(`Updated ${newName}`, 'success')
            })
            .catch(error => {
              console.log(error);
              console.log(per.id);
              
              setPersons(persons.filter(p => p.id !== per.id))
              setPersonsToShow(persons.filter(p => p.id !== per.id))
              showMessage(`${newName} has already been removed from the server`, 'error')
              
            })
        }
      } else {
        console.log('step0');
        
        personService
          .create(newObject)
          .then(returnedContact => {
            setPersons(persons.concat(returnedContact))
            setPersonsToShow(persons.concat(returnedContact))
            resetForm()
            showMessage(`Added ${newName}`, 'success')
          })
          .catch(error => {
            console.log(error.response.data)
            showMessage(`${error.response.data.error}`, 'error')
          })
      }
    }
  }

  const handleDeleteClick = (id, name) => {
    let message = `Do you really want to delete ${name}?`
    if(window.confirm(message)){
      personService
        .deleteContact(id)
        .then(res => {
          setPersons(persons.filter(p => p.id !== id))
          setPersonsToShow(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          showMessage(`${name} has already been removed from the server`, 'error')
        })
    }
  }

  const resetForm = () => {
    setNewName('')
    setNewNumber('')
    document.getElementById('nameInput0').value = ''
    document.getElementById('numberInput0').value = ''
  }

  const showMessage = (msg, msgClass) => {
    setMessage(msg)
    setNotClass(msgClass)
    setTimeout(() => {
      setMessage(null)
      setNotClass(null)
    }, 5000)
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
      <Notification message={message} notClassName={notClass} />
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