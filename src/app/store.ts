import { configureStore } from '@reduxjs/toolkit'
import itemSlice from '../features/todolistSlice'
// ...
const store = configureStore({
  reducer: {
    items: itemSlice
  },
})
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store