const EntryForm = () => {
  return (
    <form>
      <label>
        date
        <input type='date' name='date' />
      </label>
      <br />

      <label>
        visibility
        <input type='text' name='visibility' />
      </label>
      <br />

      <label>
        weather
        <input type='text' name='weather' />
      </label>
      <br />

      <label>
        comment
        <input type='text' name='comment' />
      </label>
      <br />

      <button>add</button>
    </form>
  )
}

export default EntryForm