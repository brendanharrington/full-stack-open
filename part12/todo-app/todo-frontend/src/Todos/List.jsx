import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  return (
    <>
      {todos.map(todo => {
        return (
          <Todo {...{ todo, onClickDelete, onClickComplete}} key={todo._id}/>
        )
      }).reduce((acc, cur, idx) => [...acc, <hr key={idx}/>, cur], [])}
    </>
  )
}

export default TodoList
