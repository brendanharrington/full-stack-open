import { useState, useEffect } from 'react';
import './App.css';
import * as personService from './services/persons';

function App() {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Fetch persons on mount
  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const data = await personService.getAll();
        setPersons(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching persons:', err);
        setError('Failed to load phonebook');
        setLoading(false);
      }
    };

    fetchPersons();
  }, []);

  const showMessage = (msg, isError = false) => {
    setMessage({ text: msg, isError });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!name || !number) {
      showMessage('Name and number are required', true);
      return;
    }

    // Check if person already exists
    const existingPerson = persons.find(
      p => p.name.toLowerCase() === name.toLowerCase()
    );

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${name} is already in the phonebook. Replace the old number with a new one?`
      );

      if (confirmUpdate) {
        try {
          const updatedPerson = await personService.update(existingPerson._id, {
            name,
            number,
          });
          setPersons(persons.map(p => 
            p._id === existingPerson._id ? updatedPerson : p
          ));
          showMessage(`Updated ${name}'s number`);
          setName('');
          setNumber('');
        } catch (err) {
          console.error('Error updating person:', err);
          showMessage('Failed to update person', true);
        }
      }
      return;
    }

    try {
      const newPerson = await personService.create({ name, number });
      setPersons([...persons, newPerson]);
      showMessage(`Added ${name}`);
      setName('');
      setNumber('');
    } catch (err) {
      console.error('Error adding person:', err);
      showMessage('Failed to add person', true);
    }
  };

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`);
    
    if (confirmDelete) {
      try {
        await personService.remove(id);
        setPersons(persons.filter(p => p._id !== id));
        showMessage(`Deleted ${name}`);
      } catch (err) {
        console.error('Error deleting person:', err);
        showMessage('Failed to delete person', true);
      }
    }
  };

  if (loading) {
    return <div>Loading phonebook...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <>
      <h1>Phonebook</h1>
      
      {message && (
        <div 
          style={{
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            backgroundColor: message.isError ? '#ffebee' : '#e8f5e9',
            color: message.isError ? '#c62828' : '#2e7d32',
            border: `1px solid ${message.isError ? '#ef9a9a' : '#a5d6a7'}`,
          }}
        >
          {message.text}
        </div>
      )}

      <h2>Add a number</h2>
      <form onSubmit={handleAdd}>
        <label>
          name{' '}
          <input 
            type='text' 
            value={name} 
            onChange={e => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          number{' '}
          <input 
            type='text' 
            value={number} 
            onChange={e => setNumber(e.target.value)}
          />
        </label>
        <br />
        <button type='submit'>add</button>
      </form>

      <h2>Numbers</h2>
      {persons.length === 0 ? (
        <p>No contacts in phonebook</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Number</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {persons.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.number}</td>
                <td>
                  <button onClick={() => handleDelete(p._id, p.name)}>
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;