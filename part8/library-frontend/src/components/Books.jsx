import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import PropTypes from "prop-types";
import Select from "react-select";

import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState(null)

  if (!props.show) return null

  if (result.loading) return <div>loading...</div>
  
  const books = result.data.allBooks
  const genres = [...new Set(books.flatMap(book => book.genres))]

  const options = genres.map(g => {
    return { value: g, label: g }
  })

  return (
    <div>
      <h2>books</h2>
      <Select 
        options={options}
        onChange={(selected) => setFilter(selected ? selected.value : null)}
        value={options.find((o) => o.value === filter) || null}
        isClearable
        placeholder="Select a genre to filter by..."
      />
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filter 
            ? books
              .slice()
              .filter(book => book.genres.includes(filter))
              .map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))
            : books.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

Books.propTypes = {
  show: PropTypes.bool
}

export default Books
