import { useOutletContext } from 'react-router';

const Authors = () => {
  const { authors } = useOutletContext();

  return (
    <>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th scope='col'>Author</th>
            <th scope='col'>Articles</th>
            <th scope='col'>Likes</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((a, idx) => (
            <tr key={idx}>
              <td>{a.author ?? 'unknown'}</td>
              <td>{a.articles}</td>
              <td>{a.likes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Authors;