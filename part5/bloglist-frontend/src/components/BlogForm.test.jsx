import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Brendan',
    url: 'www.testing.com',
    likes: 18
  }

  test('event handler has correct details when called', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm onCreate={createBlog} />)

    const titleInput = container.querySelector('.title-input')
    const authorInput = container.querySelector('.author-input')
    const urlInput = container.querySelector('.url-input')
    const sendButton = screen.getByText('Create')

    await user.type(titleInput, blog.title)
    await user.type(authorInput, blog.author)
    await user.type(urlInput, blog.url)
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toBe(blog.title)
    expect(createBlog.mock.calls[0][1]).toBe(blog.author)
    expect(createBlog.mock.calls[0][2]).toBe(blog.url)
  })
})