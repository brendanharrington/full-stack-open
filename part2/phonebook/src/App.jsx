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
    const personObj = { name: newName, number: newNumber }

    const existingPerson = persons.find(p => p.name === personObj.name)

    if (existingPerson && existingPerson.number === personObj.number) {
      alert(`${personObj.name} is already added to the phonebook`)
    } else if (existingPerson && existingPerson.number !== personObj.number) {
      handleReplace({ ...existingPerson, number: newNumber }) 
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

  const handleReplace = (person) => {
    const updatedPerson = {...person, number: newNumber}

    if(confirm(`${person.name} already exists in the phonebook. Replace the old number with a new one?`)) {
      personService
        .replace(person.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        })
        .catch(error => {
          console.error('Error updating person:', error)
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