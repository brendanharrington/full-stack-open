import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, expect, test, vi, afterEach } from 'vitest'

import Todo from './Todo'

describe('example', () => {
  test('should work as expected', () => {
    expect(Math.sqrt(4)).toBe(2)
  })
})

describe('Todo.jsx', () => {
  afterEach(async () => {
    cleanup()
  })

  const incompleteTodo = { text: 'Write tests', done: false, id: '1' }
  const completeTodo = { text: 'Already done', done: true, id: '2' }
  const noHandlerTodo = { text: 'No handlers', done: false, id: '3' }

  const deleteSpy = vi.fn()
  const completeSpy = vi.fn()
  const onClickDelete = (t) => () => deleteSpy(t)
  const onClickComplete = (t) => () => completeSpy(t)

  test('renders todo text and not-done controls', () => {
    render(
      <Todo 
        todo={incompleteTodo}
        onClickDelete={onClickDelete}
        onClickComplete={onClickComplete}
      />
    )

    expect(screen.getByText(/Write tests/)).toBeDefined()
    expect(screen.getByText(/This todo is not done/)).toBeDefined()
    expect(screen.getByText(/Delete/)).toBeDefined()
    expect(screen.getByText(/Set as done/)).toBeDefined()

    fireEvent.click(screen.getByText(/Delete/))
    expect(deleteSpy).toHaveBeenCalledWith(incompleteTodo)

    fireEvent.click(screen.getByText(/Set as done/))
    expect(completeSpy).toHaveBeenCalledWith(incompleteTodo)
  })

  test('renders done state and omits set-as-done button', () => {
    render(
      <Todo 
        todo={completeTodo}
        onClickDelete={onClickDelete}
        onClickComplete={onClickComplete}
      />
    )

    expect(screen.getByText(/Already done/)).toBeDefined()
    expect(screen.getByText(/This todo is done/)).toBeDefined()
    expect(screen.getByText(/Delete/)).toBeDefined()

    const setAsDone = screen.queryByText(/Set as done/)
    expect(setAsDone).toBeNull()


    fireEvent.click(screen.getByText(/Delete/))
    expect(deleteSpy).toHaveBeenCalledWith(completeTodo)
  })

  test('renders even if handlers are no-ops', () => {
    render(
      <Todo
        todo={noHandlerTodo}
        onClickDelete={() => {}}
        onClickComplete={() => {}}
      />
    )
    expect(screen.getByText(/No handlers/)).toBeDefined()
  })
})