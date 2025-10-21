import { useQuery } from "@apollo/client/react";
import { ME, ALL_BOOKS } from "../queries";
import PropTypes from "prop-types";

const Recommendations = ({ show }) => {
  const userQuery = useQuery(ME)
  const bookQuery = useQuery(ALL_BOOKS)

  if (!show) return null

  if (userQuery.loading || bookQuery.loading) {
    return <div>loading data...</div>
  }

  const user = userQuery.data.me
  const books = bookQuery.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre, <b>{user.favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .slice()
            .filter(book => book.genres.includes(user.favoriteGenre))
            .map((a) => (
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

Recommendations.propTypes = {
  show: PropTypes.bool
}

export default Recommendations