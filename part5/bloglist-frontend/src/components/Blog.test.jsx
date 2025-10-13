import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  test('only renders title and author by default', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Brendan',
      url: 'www.testing.com',
      likes: 18
    }

    render(<Blog blog={blog} />)

    const titleElement = screen.getByText(blog.title, { exact: false })
    const authorElement = screen.getByText(blog.author, { exact: false })
    const urlElement = screen.queryByText(blog.url)
    const likesElement = screen.queryByText(`likes ${blog.likes}`)

    expect(titleElement).toBeDefined()
    expect(authorElement).toBeDefined()
    expect(urlElement).toBeNull()
    expect(likesElement).toBeNull()
  })
})