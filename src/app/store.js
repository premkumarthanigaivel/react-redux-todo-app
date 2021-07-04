import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../components/TodoSlice'

export const store = configureStore({
  reducer: {
    todo: todoReducer
  }
})
