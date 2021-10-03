import { createSlice } from '@reduxjs/toolkit'

let initialState = []


//slice

export const TodoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    initTodo: (state, action) => [...state, ...action.payload],
    addTodo: (state, action) => [
      ...state,
      { id: action.payload.id, value: action.payload.value, checked: false }
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

export const { initTodo, addTodo, deleteTodo, completeTodo } = TodoSlice.actions

//selectors - for further use in useSelector

export const selectTodos = (state) => state.todo

//to be used in configureStore, there all reducers are aggregated

export default TodoSlice.reducer
