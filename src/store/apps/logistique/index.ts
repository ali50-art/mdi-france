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
export const fetchData = createAsyncThunk('appLogistique/fetchData', async (params: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const response = await axios.get(`${serverUri.uri}/api/charge`, {
    headers: {
      Authorization: storedToken
    },
    params
  })

  //   const response2 = await axios.get(`${serverUri.uri}/api/charge/count`, {
  //     headers: {
  //       Authorization: storedToken
  //     },
  //     params
  //   })

  const dataCoipe = { ...response.data.data }
  dataCoipe.docs.forEach((element: any) => (element.id = element._id))

  return { dataCoipe, count: 0 }
})

// ** Add Cahrge
export const addCharge = createAsyncThunk(
  'appLogistique/addCharge',
  async (data: object, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    const config = {
      headers: {
        'Content-Type': 'application/json', // Example: JSON data
        Authorization: storedToken
      }
    }
    const newData = {
      ...data
    }

    const response = await axios.post(`${serverUri.uri}/api/charge`, newData, config)
    dispatch(fetchData(getState().user.params))

    return response.data.data
  }
)
export const ReCharge = createAsyncThunk('appLogistique/ReCharge', async (data: object) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const config = {
    headers: {
      'Content-Type': 'application/json', // Example: JSON data
      Authorization: storedToken
    }
  }
  const newData: any = {
    ...data
  }

  const response = await axios.post(`${serverUri.uri}/api/charge/${newData.chargeId}`, newData, config)

  return response.data.data
})

// ** Delete User
export const desarge = createAsyncThunk('appLogistique/desarge', async (data: { [key: string]: number | string }) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const config = {
    headers: {
      'Content-Type': 'application/json', // Example: JSON data
      Authorization: storedToken
    }
  }
  const response = await axios.put(`${serverUri.uri}/api/charge/remove/${data.chargeId}/${data.id}`, {}, config)

  return response.data
})

// ** Update User
export const updateCharge = createAsyncThunk(
  'appLogistique/updateMaterial',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    const config = {
      headers: {
        'Content-Type': 'application/json', // Example: JSON data
        Authorization: storedToken
      }
    }
    const { id, ...filterData } = data
    const response = await axios.put(`${serverUri.uri}/api/material/${id}`, filterData, config)
    dispatch(fetchData(getState().user.params))

    return response.data
  }
)

export const appLogistiqueSlice = createSlice({
  name: 'appLogistique',
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

export default appLogistiqueSlice.reducer
