import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import PropTypes from "prop-types";
import Select from "react-select";

import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [filter, setFilter] = useState(null)

  const allBooksResult = useQuery(ALL_BOOKS)

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: filter }
  })

  useEffect(() => {
    result.refetch({ genre: filter })
  }, [filter, result.refetch])

  if (!props.show) return null

  if (result.loading || allBooksResult.loading) {
    return <div>loading...</div>
  }
  
  const allBooks = allBooksResult.data.allBooks
  const filteredBooks = result.data.allBooks
  const genres = [...new Set(allBooks.flatMap(book => book.genres))]

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
          {filteredBooks.map((a) => (
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
