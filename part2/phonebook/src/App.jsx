import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [nameFilter, setNameFilter] = useState('')
  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(nameFilter))

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {name: newName, number: newNumber}

    if (persons.find(person => person.name === personObj.name)) {
      alert(`${personObj.name} is already added to the phonebook`)
    } else {
      personService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
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

  const handleDelete = (person) => {
    if(confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
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
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App