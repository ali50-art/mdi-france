// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import authConfig from 'src/configs/auth'
import { serverUri } from 'src/configs/auth'

// interface DataParams {
//   q: string
//   role?: string
//   status: string
// }

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Users
export const fetchData = createAsyncThunk('appSuiveChantierPdf/fetchData', async (data: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const response = await axios.get(`${serverUri.uri}/api/pdf/${data.id}`, {
    headers: {
      Authorization: storedToken
    }
  })

  return response.data.data
})

// ** Update User
export const updatePdf = createAsyncThunk('appSuiveChantier/updatePdf', async (data: any, { dispatch }: Redux) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const config = {
    headers: {
      'Content-Type': 'application/json', // Example: JSON data
      Authorization: storedToken
    }
  }

  const response = await axios.put(`${serverUri.uri}/api/pdf/${data.pdfId}/${data.pdfDetailsId}`, {}, config)
  dispatch(fetchData({ id: data.pdfId }))

  return response.data
})

export const appSuiveChantierSlice = createSlice({
  name: 'appSuiveChantierPdf',
  initialState: {
    data: [],
    isLoading: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload
        state.isLoading = false
      })
      .addCase(fetchData.rejected, state => {
        state.isLoading = false
      })
  }
})

export default appSuiveChantierSlice.reducer
