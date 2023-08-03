// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers

import user from 'src/store/apps/user'
import material from 'src/store/apps/material'
import order from 'src/store/apps/order'
import logistique from './apps/logistique'
import chargeDetails from './apps/ChargeDetails'
import pdf from './apps/pdf'

export const store = configureStore({
  reducer: {
    user,
    material,
    order,
    logistique,
    chargeDetails,
    pdf
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
