import { createSlice } from '@reduxjs/toolkit'
import uuid from 'uuid-random'

//init state of app

const initialState = [
  {
    id: 'default-12345',
    value: 'Redux - Wake up at 5:00 AM',
    checked: false
  }
]

//slice

export const TodoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => [
      ...state,
      { id: `${uuid()}`, value: action.payload.value, checked: false }
    ],

    deleteTodo: (state, action) =>
      state.slice().filter((item) => item.id != action.payload.todoId),
    completeTodo: (state, action) =>
      state.slice().map((item) => {
        if (item.id === action.payload.todoId)
          return { ...item, checked: !item.checked }
        else return item
      })
  }
})

//event dispatchers - for further use in useDispatch

export const { addTodo, deleteTodo, completeTodo } = TodoSlice.actions

//selectors - for further use in useSelector

export const selectTodos = (state) => state.todo

//to be used in configureStore, there all reducers are aggregated

export default TodoSlice.reducer
