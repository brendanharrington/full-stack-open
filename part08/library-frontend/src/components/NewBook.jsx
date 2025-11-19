import { useState } from 'react';
import { useMutation, useSubscription } from "@apollo/client/react";
import PropTypes from "prop-types";

import { ALL_AUTHORS, CREATE_BOOK, BOOK_ADDED, BOOK_DETAILS } from '../queries';

const NewBook = ({ show, notify, client }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      alert(`${addedBook.title} added to the library`)

      // normalize the new book in cache using the shared BOOK_DETAILS fragment
      try {
        const bookId = client.cache.identify(addedBook) || `Book:${addedBook.id}`
        client.cache.writeFragment({
          id: bookId,
          fragment: BOOK_DETAILS,
          data: addedBook
        })

        const bookRef = { __ref: bookId }

        client.cache.modify({
          fields: {
            allBooks(existing = []) {
              if (existing.some((ref) => ref.__ref === bookRef.__ref)) {
                return existing
              }
              return existing.concat(bookRef)
            }
          }
        })
      } catch (e) {
        // ignore cache update errors
      }
    }
  })

  const [ createBook ] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      notify(error.errors[0].message, 'error')
    },
    onCompleted: (data) => {
      const addedBook = data.addBook
      notify(`${title} by ${author} added!`, 'success')

      // normalize and add to allBooks
      try {
        const bookId = client.cache.identify(addedBook) || `Book:${addedBook.id}`

        client.cache.writeFragment({
          id: bookId,
          fragment: BOOK_DETAILS,
          data: addedBook
        })

        const bookRef = { __ref: bookId }

        client.cache.modify({
          fields: {
            allBooks(existing = []) {
              if (existing.some((ref) => ref.__ref === bookRef.__ref)) {
                return existing
              }
              return existing.concat(bookRef)
            }
          }
        })
      } catch (e) {
        // ignore
      }
    },
    // still update authors list
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    await createBook({ variables: { title, author, published: Number(published), genres }})

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>add book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

NewBook.propTypes = {
  show: PropTypes.bool,
  notify: PropTypes.func
  ,client: PropTypes.object
}

export default NewBook