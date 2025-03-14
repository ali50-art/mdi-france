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
export const fetchData = createAsyncThunk('appPdf/fetchData', async (params: any) => {
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
export const fetchAllData = createAsyncThunk('appPdf/fetchAllData', async () => {
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
export const addPdf = createAsyncThunk('appPdf/addPdf', async (data: any) => {
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
export const fetchCountData = createAsyncThunk('appPdf/fetchCountData', async (params: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const response = await axios.get(`${serverUri.uri}/api/pdf/countPdf/${params.id}`, {
    headers: {
      Authorization: storedToken
    }
  })

  return response.data.data
})
export const getSepcifiqueStat = createAsyncThunk('appPdf/getSepcifiqueStat', async (data: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const results = await axios.post(`${serverUri.uri}/api/statistique/specifique`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: storedToken
    }
  })

  return results.data.data
})

// ** Fetch Instalateur Data
export const fetchInstalteurData = createAsyncThunk('appPdf/fetchInstalteurData', async (params: any) => {
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
export const deletePdf = createAsyncThunk('appPdf/deletePdf', async (id: any, { getState, dispatch }: Redux) => {
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
})

// ** Update User
export const updatePdf = createAsyncThunk(
  'appPdf/updatePdf',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    const config = {
      headers: {
        'Content-Type': 'application/json', // Example: JSON data
        Authorization: storedToken
      }
    }
    const { id, ...filterData } = data
    const response = await axios.put(`${serverUri.uri}/api/Pdf/${id}`, filterData, config)
    dispatch(fetchData(getState().user.params))

    return response.data
  }
)

// ** Fetch Totla vanne voie 3
export const fetchTotalVanneVoie3 = createAsyncThunk(
  'fetchTotalVanneVoie3/fetchTotalVanneVoie3',
  async (params: any) => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    const response = await axios.get(`${serverUri.uri}/api/pdf/countVanneVoie3/${params.id}`, {
      headers: {
        Authorization: storedToken
      },
      params
    })

    console.log('response.data.data : ', response.data.data)

    return response.data.data
  }
)
export const appPdfSlice = createSlice({
  name: 'appPdf',
  initialState: {
    data: [],
    stat: [],
    countedData: [],
    total: 1,
    isLoading: false,
    params: {},
    count: 0,
    TotalVanneVoie: [],
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
    builder.addCase(getSepcifiqueStat.fulfilled, (state, action) => {
      state.stat = action.payload
    })
    builder
      .addCase(fetchTotalVanneVoie3.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchTotalVanneVoie3.fulfilled, (state, action) => {
        state.TotalVanneVoie = action.payload
      })
      .addCase(fetchTotalVanneVoie3.rejected, state => {
        state.isLoading = false
      })
  }
})

export default appPdfSlice.reducer
