import React, { useState } from 'react'
import Button from './components/Button'
import Input from './components/Input'
import PlainText from './components/PlainText'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleAddClick = (e) => {
    e.preventDefault()
    let newObject = {
      name: newName
    }
    setPersons(persons.concat(newObject))
    setNewName('')
    document.getElementById('nameInput0').value = ''
  }

  const handleAddOnChange = (e) => {
    setNewName(e.target.value)
    console.log(newName);
    
  }

  console.log(persons);

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Name: <Input placeholder={'Nimi..'} handleOnChange={handleAddOnChange} id={'nameInput0'} />
        </div>
        <div>
          <Button type={'submit'} handleClick={handleAddClick} text={'Add'} />
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) => 
        <PlainText text={person.name} key={i} />
      )}
    </div>
  )
}

export default App