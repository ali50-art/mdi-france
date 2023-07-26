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
export const fetchData = createAsyncThunk('appMaterial/fetchData', async (params: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const response = await axios.get(`${serverUri.uri}/api/material`, {
    headers: {
      Authorization: storedToken
    },
    params
  })
  const response2 = await axios.get(`${serverUri.uri}/api/material/count`, {
    headers: {
      Authorization: storedToken
    },
    params
  })

  const dataCoipe = { ...response.data.data }
  dataCoipe.docs.forEach((element: any) => (element.id = element._id))

  return { dataCoipe, count: response2.data.data }
})
export const fetchAllData = createAsyncThunk('appMaterial/fetchAllData', async () => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const response = await axios.get(`${serverUri.uri}/api/material/all`, {
    headers: {
      Authorization: storedToken
    }
  })
  const dataCoipe = { ...response.data.data }

  return { dataCoipe }
})

// ** Add User
export const addMateriel = createAsyncThunk(
  'appMaterial/addMateriel',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
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

    const response = await axios.post(`${serverUri.uri}/api/material`, newData, config)
    dispatch(fetchData(getState().user.params))

    return response.data.data
  }
)

// ** Delete User
export const deleteMaterial = createAsyncThunk(
  'appMaterial/deleteMaterial',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    const config = {
      headers: {
        'Content-Type': 'application/json', // Example: JSON data
        Authorization: storedToken
      }
    }
    const response = await axios.delete(`${serverUri.uri}/api/material/${id}`, config)
    dispatch(fetchData(getState().user.params))

    return response.data
  }
)

// ** Update User
export const updateMateriel = createAsyncThunk(
  'appMaterial/updateMaterial',
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

export const appMaterialSlice = createSlice({
  name: 'appMaterial',
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
    builder.addCase(fetchAllData.fulfilled, (state, action) => {
      state.data = action.payload.dataCoipe
      state.total = action.payload.dataCoipe.length
      state.params = {}
      state.allData = action.payload.dataCoipe
    })
  }
})

export default appMaterialSlice.reducer
