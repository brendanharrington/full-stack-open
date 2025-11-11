import { useState } from 'react';
import './App.css';

function App() {
  const [persons, setPersons] = useState([
    {
      id: 0,
      name: 'Person 0',
      number: '000-000-0000',
    },
    {
      id: 1,
      name: 'Person 1',
      number: '111-111-1111',
    },
    {
      id: 2,
      name: 'Person 2',
      number: '222-222-2222',
    },
    {
      id: 3,
      name: 'Person 3',
      number: '333-333-3333',
    },
    {
      id: 4,
      name: 'Person 4',
      number: '444-444-4444',
    },
    {
      id: 5,
      name: 'Person 5',
      number: '555-555-5555',
    },
  ]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleAdd = e => {
    e.preventDefault();
    setName('');
    setNumber('');
  };

  const handleDelete = id => {
    setPersons(persons.filter(p => p.id != id))
  };

  return (
    <>
      <h1>Phonebook</h1>
      <h2>Add a number</h2>
      <form onSubmit={handleAdd}>
        <label>
          name
          <input 
            type='text' 
            value={name} 
            onChange={e => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          number
          <input 
            type='text' 
            value={number} 
            onChange={e => setNumber(e.target.value)}
          />
        </label>
        <br />
        <button>add</button>
      </form>
      <p>{name}</p>
      <p>{number}</p>
      <h2>Numbers</h2>
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
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.number}</td>
              <td>
                <button onClick={() => handleDelete(p.id)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
