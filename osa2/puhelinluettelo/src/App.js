import React, { useState } from 'react'
import Button from './components/Button'
import Input from './components/Input'
import PlainText from './components/PlainText'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040000000'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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

  const handleAddOnChange = (e) => {
    setNewName(e.target.value)
  }

  const handleAddNumberOnChange = (e) => {
    setNewNumber(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map((person, i) => 
        <PlainText text={`${person.name} ${person.number}`} key={i} />
      )}
    </div>
  )
}

export default App