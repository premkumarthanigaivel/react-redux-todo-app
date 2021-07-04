import React, { useState, useEffect } from 'react'
import ListItem from '@material-ui/core/ListItem'
import DeleteIcon from '@material-ui/icons/Delete'
import { TODOBox, TODOList, TODOInput, TODOHeader } from './Todostyles'
import { TODOListItemText } from './Todostyles'
import { IconButton, Checkbox } from '@material-ui/core'
import { ListItemSecondaryAction } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, completeTodo, deleteTodo, selectTodos } from './TodoSlice'

const ENTER_KEY = 'Enter'

export const TODO = () => {
  const todoTasks = useSelector(selectTodos)
  const dispatch = useDispatch()

  const handleAddTodo = (event) => {
    if (event.nativeEvent.key === ENTER_KEY) {
      dispatch(addTodo({ value: event.target.value }))
    }
  }

  const todoListItems = todoTasks.map((item) => (
    <ListItem divider>
      <Checkbox
        color="primary"
        style={{ marginRight: '5px' }}
        checked={item.checked}
        onChange={() => dispatch(completeTodo({ todoId: item.id }))}
      />
      <TODOListItemText
        primary={item.value}
        id={item.id}
        completed={item.checked}
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => dispatch(deleteTodo({ todoId: item.id }))}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ))

  return (
    <TODOBox>
      <TODOHeader>TO-DO APP</TODOHeader>
      <TODOInput placeholder="New to do" onKeyPress={handleAddTodo} />
      <TODOList children={todoListItems}></TODOList>
    </TODOBox>
  )
}
