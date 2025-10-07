import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [nameFilter, setNameFilter] = useState('')
  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(nameFilter))

  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {name: newName, number: newNumber}

    if (persons.find(person => person.name === personObj.name)) {
      alert(`${personObj.name} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(personObj))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    if (event.target.value) {
      setNameFilter(event.target.value.toLowerCase())
      setShowAll(false)
    } else {
      setShowAll(true)
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter onChange={handleFilterChange} />
      <h2>Add a new number</h2>
      <PersonForm 
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App