import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import Select from "react-select";
import PropTypes from "prop-types";

import { ALL_AUTHORS, ALL_BOOKS, UPDATE_AUTHOR } from "../queries";

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ]
  })

  if (!props.show) {
    return null
  }

  if (result.loading) return <div>loading...</div>

  const authors = result.data.allAuthors

  const options = authors.map(a => {
    return { value: a.name, label: a.name }
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name, setBornTo: Number(born) }})

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={handleSubmit}>
        <Select
          options={options}
          onChange={(selected) => setName(selected ? selected.value : '')}
          value={options.find((o) => o.value === name) || null}
          isClearable
          placeholder="Select author..."
        />
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

Authors.propTypes = {
  show: PropTypes.bool
}

export default Authors
