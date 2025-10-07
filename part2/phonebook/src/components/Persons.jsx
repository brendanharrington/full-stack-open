const Persons = ({ personsToShow }) => {
  return (
    <ul style={{listStyleType: 'none', paddingInlineStart: 0}}>
      {personsToShow.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
    </ul>
  )
}

export default Persons