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
export const fetchData = createAsyncThunk('appPdfHistorique/fetchData', async (params: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const response = await axios.get(`${serverUri.uri}/api/pdf`, {
    headers: {
      Authorization: storedToken
    },
    params
  })
  const response2 = await axios.get(`${serverUri.uri}/api/Pdf/count`, {
    headers: {
      Authorization: storedToken
    },
    params
  })

  const dataCoipe = { ...response.data.data }
  dataCoipe.docs.forEach((element: any) => (element.id = element._id))

  return { dataCoipe, count: response2.data.data }
})
export const fetchAllData = createAsyncThunk('appPdfHistorique/fetchAllData', async () => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const response = await axios.get(`${serverUri.uri}/api/Pdf/all`, {
    headers: {
      Authorization: storedToken
    }
  })
  const dataCoipe = { ...response.data.data }

  return { dataCoipe }
})

// ** Add User
export const addPdf = createAsyncThunk('appPdfHistorique/addPdf', async (data: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const config = {
    headers: {
      'Content-Type': 'application/json', // Example: JSON data
      Authorization: storedToken
    }
  }

  const response = await axios.post(`${serverUri.uri}/api/pdf`, data, config)

  return response
})

// ** Fetch Users
export const fetchCountData = createAsyncThunk('appPdfHistorique/fetchCountData', async (params: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const response = await axios.get(`${serverUri.uri}/api/pdf/countPdf/${params.id}`, {
    headers: {
      Authorization: storedToken
    }
  })

  return response.data.data
})

// ** Fetch Instalateur Data
export const fetchInstalteurData = createAsyncThunk('appPdfHistorique/fetchInstalteurData', async (params: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const response = await axios.get(`${serverUri.uri}/api/pdf-on-instaleur/all`, {
    headers: {
      Authorization: storedToken
    },
    params
  })

  const dataCoipe = { ...response.data.data }
  dataCoipe.docs.forEach((element: any) => (element.id = element._id))

  return { dataCoipe }
})

// ** Delete User
export const deletePdf = createAsyncThunk(
  'appPdfHistorique/deletePdf',
  async (id: any, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    const config = {
      headers: {
        'Content-Type': 'application/json', // Example: JSON data
        Authorization: storedToken
      }
    }
    const response = await axios.delete(`${serverUri.uri}/api/Pdf/${id}`, config)
    dispatch(fetchData(getState().user.params))

    return response.data
  }
)

export const appPdfHistoriqueSlice = createSlice({
  name: 'appPdfHistorique',
  initialState: {
    data: [],
    countedData: [],
    total: 1,
    isLoading: false,
    params: {},
    count: 0,
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
    builder.addCase(fetchAllData.fulfilled, (state, action) => {
      state.data = action.payload.dataCoipe
      state.total = action.payload.dataCoipe.length
      state.params = {}
      state.allData = action.payload.dataCoipe
    })

    builder.addCase(fetchInstalteurData.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload.dataCoipe.docs
      state.total = action.payload.dataCoipe.meta.totalDocs
      state.params = action.payload.dataCoipe.meta
    })
    builder.addCase(fetchCountData.fulfilled, (state, action) => {
      state.isLoading = false
      state.countedData = action.payload
    })
  }
})

export default appPdfHistoriqueSlice.reducer
