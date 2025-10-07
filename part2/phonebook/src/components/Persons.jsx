import Person from './Person'

const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <ul style={{listStyleType: 'none', paddingInlineStart: 0}}>
      {personsToShow.map(person => <Person key={person.name} person={person} handleDelete={handleDelete}/>)}
    </ul>
  )
}

export default Persons