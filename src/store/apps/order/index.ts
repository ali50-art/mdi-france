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
export const fetchData = createAsyncThunk('appOrder/fetchData', async (params: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const response = await axios.get(`${serverUri.uri}/api/orderDetails`, {
    headers: {
      Authorization: storedToken
    },
    params
  })
  const response2 = await axios.get(`${serverUri.uri}/api/orderDetails/count`, {
    headers: {
      Authorization: storedToken
    },
    params
  })

  const dataCoipe = { ...response.data.data }
  dataCoipe.docs.forEach((element: any) => (element.id = element._id))

  return { dataCoipe, count: response2.data.data }
})

// ** Add User
export const addOrder = createAsyncThunk('appOrder/addOrder', async (data: object, { getState, dispatch }: Redux) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const config = {
    headers: {
      'content-type': 'multipart/form-data', // Example: JSON data
      Authorization: storedToken
    }
  }

  const response = await axios.post(`${serverUri.uri}/api/orderDetails`, data, config)
  dispatch(fetchData(getState().user.params))

  const dataCoipe = { ...response.data.data }
  dataCoipe.docs.forEach((element: any) => (element.id = element._id))

  return dataCoipe
})

// ** Delete User
export const deleteorderDetails = createAsyncThunk(
  'appOrder/deleteOrder',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    const config = {
      headers: {
        'Content-Type': 'application/json', // Example: JSON data
        Authorization: storedToken
      }
    }
    const response = await axios.delete(`${serverUri.uri}/api/orderDetails/${id}`, config)
    dispatch(fetchData(getState().user.params))

    return response.data
  }
)

// ** Update User
export const updateOrder = createAsyncThunk(
  'appOrder/updateOrder',
  async (payload: any, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: storedToken
      }
    }
    console.log('payload : ', payload)

    const { id, data } = payload

    const response = await axios.put(`${serverUri.uri}/api/orderDetails/${id}`, data, config)
    dispatch(fetchData(getState().user.params))

    return response.data
  }
)

export const appOrderSlice = createSlice({
  name: 'appOrder',
  initialState: {
    data: [],
    total: 1,
    params: {},
    count: 0,
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.dataCoipe.docs
      state.total = action.payload.dataCoipe.meta.totalDocs
      state.params = action.payload.dataCoipe.meta
      state.allData = action.payload.dataCoipe
      state.count = action.payload.count
    })
  }
})

export default appOrderSlice.reducer
