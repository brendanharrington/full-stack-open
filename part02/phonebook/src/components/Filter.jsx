const Filter = ({ onChange }) => {
  return (
    <form>
      <label htmlFor='filter'>Filter by name: </label> 
      <input type='text' id='filter' name='filter' onChange={onChange} />
    </form>
  )
}

export default Filter