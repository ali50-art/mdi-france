// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers

import user from 'src/store/apps/user'
import material from 'src/store/apps/material'
import order from 'src/store/apps/order'

export const store = configureStore({
  reducer: {
    user,
    material,
    order
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
