// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import randomstring from 'randomstring'

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
export const fetchData = createAsyncThunk('appUsers/fetchData', async (params: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const response = await axios.get(`${serverUri.uri}/api/admin/users`, {
    headers: {
      Authorization: storedToken
    },
    params
  })
  const response2 = await axios.get(`${serverUri.uri}/api/admin/users/count`, {
    headers: {
      Authorization: storedToken
    },
    params
  })

  const dataCoipe = { ...response.data.data }
  dataCoipe.docs.forEach((element: any) => (element.id = element._id))

  return { dataCoipe, count: response2.data.data }
})

export const fetchinstallateursData = createAsyncThunk('appUsers/fetchInstaleursData', async () => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const response = await axios.get(`${serverUri.uri}/api/admin/users?search=instalateur`, {
    headers: {
      Authorization: storedToken
    }
  })

  const dataCoipe = { ...response.data.data }
  dataCoipe.docs.forEach((element: any) => (element.id = element._id))

  return { dataCoipe }
})

// ** Add User
export const addUser = createAsyncThunk(
  'appUsers/addUser',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    const config = {
      headers: {
        'Content-Type': 'application/json', // Example: JSON data
        Authorization: storedToken
      }
    }
    const password = randomstring.generate(10)
    const newData = {
      ...data,
      password
    }

    const response = await axios.post(`${serverUri.uri}/api/admin/users`, newData, config)
    dispatch(fetchData(getState().user.params))

    const dataCoipe = { ...response.data.data }
    dataCoipe.docs.forEach((element: any) => (element.id = element._id))

    return dataCoipe
  }
)

// ** Delete User
export const deleteUser = createAsyncThunk(
  'appUsers/deleteUser',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    const config = {
      headers: {
        'Content-Type': 'application/json', // Example: JSON data
        Authorization: storedToken
      }
    }
    const response = await axios.delete(`${serverUri.uri}/api/admin/users/${id}`, config)
    dispatch(fetchData(getState().user.params))

    return response.data
  }
)

// ** Update User
export const updateUser = createAsyncThunk(
  'appUsers/deleteUser',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    const config = {
      headers: {
        'Content-Type': 'application/json', // Example: JSON data
        Authorization: storedToken
      }
    }
    const response = await axios.put(`${serverUri.uri}/api/admin/users/${data.id}`, data, config)
    dispatch(fetchData(getState().user.params))

    return response.data
  }
)

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    isLoading: false,
    count: [],
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        
        state.isLoading = false
        state.data = action.payload.dataCoipe.docs
        state.total = action.payload.dataCoipe.meta.totalDocs
        state.params = action.payload.dataCoipe.meta
        state.allData = action.payload.dataCoipe
        state.count = action.payload.count
      })
      .addCase(fetchData.rejected, state => {
        state.isLoading = false
      })
    builder.addCase(fetchinstallateursData.fulfilled, (state, action) => {
      state.data = action.payload.dataCoipe.docs
      state.total = action.payload.dataCoipe.meta.totalDocs
      state.params = action.payload.dataCoipe.meta
      state.allData = action.payload.dataCoipe
    })
  }
})

export default appUsersSlice.reducer
