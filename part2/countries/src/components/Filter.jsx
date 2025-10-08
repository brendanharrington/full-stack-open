const Filter = ({ handleFilterChange }) => {
  return (
    <div>
      <label htmlFor="filter">Find countries: </label>
      <input type="text" name="filter" id="filter" onChange={handleFilterChange} />
    </div>
  )
}

export default Filter