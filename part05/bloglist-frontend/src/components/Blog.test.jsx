import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Brendan',
    url: 'www.testing.com',
    likes: 18
  }

  test('only renders title and author by default', () => {
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

  test('renders url and number of likes after toggling', async () => {
    const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = container.querySelector('.blog-toggle-btn')
    await user.click(button)

    const urlElement = screen.queryByText(blog.url)
    const likesElement = screen.queryByText(`likes ${blog.likes}`)

    expect(urlElement).toBeDefined()
    expect(likesElement).toBeDefined()
  })

  test('clicking the button twice calls event handler twice', async () => {
    const mockHandler = vi.fn()

    const { container } = render(<Blog blog={blog} onLike={mockHandler} />)

    const user = userEvent.setup()
    const toggleButton = container.querySelector('.blog-toggle-btn')
    await user.click(toggleButton)

    const likeButton = container.querySelector('.like-btn')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
