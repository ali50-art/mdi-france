// ** Redux Imports
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

// ** Fetch Users
export const fetchStatMaterial = createAsyncThunk('appStat/fetchStatMaterial', async (data: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const config = {
    headers: {
      'Content-Type': 'application/json', // Example: JSON data
      Authorization: storedToken
    }
  }
  const response = await axios.post(`${serverUri.uri}/api/statistiqueMaterial`, data, config)

  return response.data.data
})
export const fetchStatInstalateur = createAsyncThunk('appStat/fetchStatInstalateur', async (data: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const config = {
    headers: {
      'Content-Type': 'application/json', // Example: JSON data
      Authorization: storedToken
    }
  }
  const response = await axios.post(`${serverUri.uri}/api/statistiqueInstalateur`, data, config)

  return response.data.data
})
export const dashboardStat = createAsyncThunk('appStat/dashboardStat', async () => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const config = {
    headers: {
      'Content-Type': 'application/json', // Example: JSON data
      Authorization: storedToken
    }
  }
  const response = await axios.get(`${serverUri.uri}/api/dashboardStat`, config)

  return response.data.data
})
export const appStatSlice = createSlice({
  name: 'appStat',
  initialState: {
    data: [],
    data2: [],
    data3: [],
    total: 1,
    isLoading: false,
    params: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchStatMaterial.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchStatMaterial.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchStatMaterial.rejected, state => {
        state.isLoading = false
      })
    builder
      .addCase(fetchStatInstalateur.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchStatInstalateur.fulfilled, (state, action) => {
        state.isLoading = false
        state.data2 = action.payload
      })
      .addCase(fetchStatInstalateur.rejected, state => {
        state.isLoading = false
      })
    builder
      .addCase(dashboardStat.pending, state => {
        state.isLoading = true
      })
      .addCase(dashboardStat.fulfilled, (state, action) => {
        state.isLoading = false
        state.data3 = action.payload
      })
      .addCase(dashboardStat.rejected, state => {
        state.isLoading = false
      })
  }
})

export default appStatSlice.reducer
