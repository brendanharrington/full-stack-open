const Person = ({ person, handleDelete}) => {
  return (
    <li>
        {person.name} {person.number} <button type='submit' value='test' onClick={() => handleDelete(person)}>delete</button>
    </li>
  )
}

export default Person