import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [nameFilter, setNameFilter] = useState('')
  const [notification, setNotification] = useState(null)
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

  const displayNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObj = { name: newName, number: newNumber }

    const existingPerson = persons.find(p => p.name === personObj.name)

    if (existingPerson && existingPerson.number === personObj.number) {
      displayNotification(`${newName} is already added to the phonebook`, 'error')
    } else if (existingPerson && existingPerson.number !== personObj.number) {
      handleReplace({ ...existingPerson, number: newNumber }) 
    } else {
      personService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          displayNotification(`${newName} added successfully!`, 'success')
        })
        .catch(error => {
          console.log(error.response.data.error)
          displayNotification(`Person validation failed: ${error.response.data.error}`, 'error')
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
    if (confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          displayNotification(`${person.name} deleted successfully!`, 'success')
        })
        .catch(error => {
          console.error('Error deleting person:', error)
          displayNotification(
            `Information for ${person.name} has already been removed from the server.`,
            'error'
          )
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const handleReplace = (person) => {
    const updatedPerson = { ...person, number: newNumber }

    if (confirm(`${person.name} already exists in the phonebook. Replace the old number with a new one?`)) {
      personService
        .replace(person.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          displayNotification(`Number for ${person.name} updated successfully!`, 'success')
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.error) {
            displayNotification(`Error: ${error.response.data.error}`, 'error')
          } else if (error.response && error.response.status === 404) {
            displayNotification(`Information for ${person.name} has already been removed from the server.`, 'error')
            setPersons(persons.filter(p => p.id !== person.id))
          } else {
            console.error('Error updating person:', error)
            displayNotification('An unexpected error occurred.', 'error')
          }
        })
    }
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification?.message} type={notification?.type} />
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