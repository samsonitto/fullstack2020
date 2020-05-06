import React, { useState } from 'react'
import Button from './components/Button'
import Input from './components/Input'
import PlainText from './components/PlainText'
import Header from './components/Header'
import Header2 from './components/Header2'

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
      <div>
        Filter by Name: <Input placeholder={'Name..'} handleOnChange={handleFilterOnChange} />
      </div>
      <Header2 text={'Add New Contact'} />
      <form>
        <div>
          Name: <Input placeholder={'Name..'} handleOnChange={handleAddOnChange} id={'nameInput0'} /><br />
          Number: <Input placeholder={'Number..'} handleOnChange={handleAddNumberOnChange} id={'numberInput0'} />
        </div>
        <div>
          <Button type={'submit'} handleClick={handleAddClick} text={'Add'} />
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person, i) => 
        <PlainText text={`${person.name} ${person.number}`} key={i} />
      )}
    </div>
  )
}

export default App