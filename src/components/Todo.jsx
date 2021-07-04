import React, { useState, useEffect } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {
  TODOBox,
  TODOList,
  TODOInput,
  TODOListItemText,
  TODOHeader
} from './Todostyles'
import DeleteIcon from '@material-ui/icons/Delete'
import { ListItemSecondaryAction } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import uuid from 'uuid-random'
import { Checkbox } from '@material-ui/core'
import { Helmet } from 'react-helmet'

const _initialState = [
  {
    id: 'default-12345',
    value: 'Wake up at 5:00 AM',
    checked: true
  }
]

const ENTER_KEY = 'Enter'

export const TODO = () => {
  const [todoTasks, setTodoTasks] = useState(_initialState)

  const deleteTodo = (todoId) =>
    setTodoTasks(todoTasks.slice().filter((item) => item.id != todoId))

  const addTodo = (event) => {
    if (event.nativeEvent.key === ENTER_KEY) {
      const newTodo = todoTasks.slice()
      newTodo.push({
        id: `${uuid()}`,
        value: event.target.value,
        checked: false
      })
      setTodoTasks(newTodo)
    }
  }

  const completeTodo = (todoId) => {
    setTodoTasks(
      todoTasks.slice().map((item) => {
        if (item.id === todoId) return { ...item, checked: !item.checked }
        else return item
      })
    )
  }

  useEffect(() => {
    console.log('todoTasks', todoTasks)
  }, [todoTasks])

  const todoListItems = todoTasks.map((item) => (
    <ListItem divider>
      <Checkbox
        color="primary"
        style={{ marginRight: '5px' }}
        checked={item.checked}
        onChange={() => completeTodo(item.id)}
      />
      <TODOListItemText
        primary={item.value}
        id={item.id}
        completed={item.checked}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon onClick={() => deleteTodo(item.id)} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ))

  return (
    <TODOBox>
      <Helmet>
        <title>📝 TO-DO</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Tangerine:wght@700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <TODOHeader>TO-DO APP</TODOHeader>
      <TODOInput placeholder="New to do" onKeyPress={addTodo} />
      <TODOList>{todoListItems}</TODOList>
    </TODOBox>
  )
}
