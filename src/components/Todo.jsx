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
import firebase from 'firebase'
import uuid from 'uuid-random'

const ENTER_KEY = 'Enter'

export const TODO = () => {
  const todoTasks = useSelector(selectTodos)
  const dispatch = useDispatch()
  const firstRenderRef = useRef(false)
  const [newTodo, setNewTodo] = useState('')

  //add todo
  const handleAddTodo = (event) => {
    if (event.nativeEvent.key === ENTER_KEY) {
      const todoItemsRef = firebase.database().ref('todoitems')
      let newTodoRef = todoItemsRef.push()
      let newTodoId = uuid()
      let todoItem = {
        id: newTodoId,
        value: event.target.value,
        checked: false
      }
      newTodoRef
        .set(todoItem)
        .then(function () {
          console.log('Item successfully added to firebase')
          dispatch(addTodo(todoItem))
          setNewTodo('')
        })
        .catch(function (error) {
          console.log('Item failed to add into firebase')
        })
    }
  }

  //delete todo

  const handleDeleteTodo = (todoId) => {
    console.log('To be deleted Todo Item: ', todoId)
    const todoItemsRef = firebase.database().ref('todoitems')
    let FBTodoId = ''

    todoItemsRef
      .orderByChild('id')
      .equalTo(todoId)
      .on('child_added', function (snapshot) {
        console.log('Firebase key: ', snapshot.key)
        FBTodoId = snapshot.key
      })
    if (FBTodoId) {
      let deleteChildRef = firebase.database().ref(`todoitems/${FBTodoId}`)
      deleteChildRef
        .remove()
        .then(function () {
          console.log('Remove succeeded.')
          // alert('Remove succeeded.')
          dispatch(deleteTodo({ todoId }))
        })
        .catch(function (error) {
          console.log('Remove failed: ' + error.message)
        })
    }
  }

  // complete todo

  const handleCompleteTodo = (todoItem) => {
    const todoItemsRef = firebase.database().ref('todoitems')
    let fireBaseTodoId = ''

    todoItemsRef
      .orderByChild('id')
      .equalTo(todoItem.id)
      .on('child_added', function (snapshot) {
        console.log('Firebase key: ', snapshot.key)
        fireBaseTodoId = snapshot.key
      })

    if (fireBaseTodoId) {
      let completeChildRef = firebase
        .database()
        .ref(`todoitems/${fireBaseTodoId}`)

      completeChildRef
        .set({
          checked: !todoItem.checked,
          id: todoItem.id,
          value: todoItem.value
        })
        .then(function () {
          alert('Complete succeeded')
          dispatch(completeTodo({ todoId: todoItem.id }))
        })
        .catch(function (error) {
          console.log('Synchronization failed')
        })
    }
  }

  //init state of app from firebase
  useEffect(() => {
    console.log('>> FIRST RENDER')
    const todoItemsRef = firebase.database().ref('todoitems')
    todoItemsRef.on('value', (snapshot) => {
      let todoItems = snapshot.val()
      if (firstRenderRef.current === false) {
        console.log('***  TODO INIT ***')
        for (let item in todoItems) {
          let tempState = []
          tempState.push({
            id: todoItems[item].id,
            value: todoItems[item].value,
            checked: todoItems[item].checked
          })
          dispatch(initTodo(tempState))
        }
      }
      firstRenderRef.current = true
    })
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
