import React, { useState, useEffect, useRef } from 'react'
import ListItem from '@material-ui/core/ListItem'
import DeleteIcon from '@material-ui/icons/Delete'
import { TODOBox, TODOList, TODOInput, TODOHeader } from './Todostyles'
import { TODOListItemText } from './Todostyles'
import { IconButton, Checkbox } from '@material-ui/core'
import { ListItemSecondaryAction } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import {
  initTodo,
  addTodo,
  completeTodo,
  deleteTodo,
  selectTodos
} from './TodoSlice'
import firebase from '../app/firebase'
import uuid from 'uuid-random'

const ENTER_KEY = 'Enter'

export const TODO = () => {
  const todoTasks = useSelector(selectTodos)
  const dispatch = useDispatch()
  const firstRenderRef = useRef(false)
  const [newTodo, setNewTodo] = useState('')

  const getFirebasePathRef = (path) => firebase.database().ref(path)
  const printError = (error) => console.error(`Error >>`, error)

  //add todo
  const handleAddTodo = (event) => {
    console.log('>>  ADD TODO')

    if (event.nativeEvent.key === ENTER_KEY) {
      let todoItem = {
        id: uuid(),
        value: event.target.value,
        checked: false
      }

      getFirebasePathRef('todoitems')
        .push(todoItem)
        .then(() => {
          console.log('Add succeeded.')
          dispatch(addTodo(todoItem))
          setNewTodo('')
        })
        .catch(err =>  printError(err))
    }
  }

  //delete todo

  const handleDeleteTodo = (todoId) => {
    console.log('>>  DELETE TODO')

    let fireBaseTodoId = ''

    getFirebasePathRef('todoitems')
      .orderByChild('id')
      .equalTo(todoId)
      .on('child_added', function (snapshot) {
        fireBaseTodoId = snapshot.key
      })
    if (fireBaseTodoId) {
      getFirebasePathRef(`todoitems/${fireBaseTodoId}`)
        .remove()
        .then(function () {
          console.log('Remove succeeded.')
          dispatch(deleteTodo({ todoId }))
        })
        .catch(err => printError(err))
    }
  }

  // complete todo

  const handleCompleteTodo = (todoItem) => {
    console.log('>>  COMPLETE TODO')

    let fireBaseTodoId = ''
    getFirebasePathRef('todoitems')
      .orderByChild('id')
      .equalTo(todoItem.id)
      .on('child_added', function (snapshot) {
        fireBaseTodoId = snapshot.key
      })

    if (fireBaseTodoId) {
      getFirebasePathRef(`todoitems/${fireBaseTodoId}`)
        .set({
          checked: !todoItem.checked,
          id: todoItem.id,
          value: todoItem.value
        })
        .then(function () {
          console.log('Complete succeeded.')
          dispatch(completeTodo({ todoId: todoItem.id }))
        })
        .catch(err => printError(err))
    }
  }

  const initTodoList = () => {
    console.log('***  TODO INIT ***')
    getFirebasePathRef('todoitems').on('value', (snapshot) => {
      let todoItems = snapshot.val()
      if (firstRenderRef.current === false) {
        for (let item in todoItems) {
          let tempState = []
          tempState.push({
            id: todoItems[item].id,
            value: todoItems[item].value,
            checked: todoItems[item].checked
          })
          dispatch(initTodo(tempState))
        }
        firstRenderRef.current = true
      }
    })
  }

  //init state of app from firebase
  useEffect(() => {
    console.log('>> FIRST RENDER')
    initTodoList()
  }, [])

  const todoListItems = todoTasks.map((item) => (
    <ListItem divider key={item.id}>
      <Checkbox
        color="primary"
        style={{ marginRight: '5px' }}
        checked={item.checked}
        onChange={() => handleCompleteTodo(item)}
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
          onClick={() => handleDeleteTodo(item.id)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ))

  return (
    <TODOBox>
      <TODOHeader>TO-DO APP</TODOHeader>
      <TODOInput
        placeholder="New to do"
        onKeyPress={handleAddTodo}
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <TODOList children={todoListItems}></TODOList>
    </TODOBox>
  )
}
