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
export const fetchData = createAsyncThunk('appSuiveChantier/fetchData', async (params: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const response = await axios.get(`${serverUri.uri}/api/pdf`, {
    headers: {
      Authorization: storedToken
    },
    params
  })

  const dataCoipe = { ...response.data.data }

  dataCoipe.docs.forEach((element: any) => (element.id = element._id))

  return { dataCoipe, count: 0 }
})
export const fetchOne = createAsyncThunk('appSuiveChantier/fetchOne', async (data: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const response = await axios.get(`${serverUri.uri}/api/pdf/${data.id}`, {
    headers: {
      Authorization: storedToken
    }
  })

  return response.data.data
})

// ** Add User
export const addPdf = createAsyncThunk('appSuiveChantier/addPdf', async (data: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const config = {
    headers: {
      'Content-Type': 'application/json', // Example: JSON data
      Authorization: storedToken
    }
  }

  const response = await axios.post(`${serverUri.uri}/api/pdf`, data, config)

  return response.data.data
})

// ** Delete User
export const deletePdf = createAsyncThunk(
  'appSuiveChantier/deletePdf',
  async (id: number | string, { getState, dispatch }: Redux) => {
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

// ** Update User
export const updatePdf = createAsyncThunk(
  'appSuiveChantier/updatePdf',
  async (data: any, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    const config = {
      headers: {
        'Content-Type': 'application/json', // Example: JSON data
        Authorization: storedToken
      }
    }
    const response = await axios.put(
      `${serverUri.uri}/api/pdf/trainter/${data.pdfId}/${data.orderId}`,
      { typeOfFunction: data.typeOfFunction },
      config
    )

    const item = getState().user.params

    const params = {
      pageSize: item.limit,
      page: item.page,
      sort: '-createdAt',
      search: '',
      status: '',
      instalateur: ''
    }

    dispatch(fetchData(params))

    return response.data
  }
)

// ** Edit pdf
export const editPdf = createAsyncThunk(
  'appSuiveChantier/editPdf',
  async (data: any, { getState, dispatch }: Redux) => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    const config = {
      headers: {
        'Content-Type': 'application/json', // Example: JSON data
        Authorization: storedToken
      }
    }
    const { pdfId, ...filterData } = data

    const response = await axios.patch(`${serverUri.uri}/api/pdf/${pdfId}`, { ...filterData }, config)
    const item = getState().user.params

    const params = {
      pageSize: item.limit,
      page: item.page,
      sort: '-createdAt',
      search: '',
      status: '',
      instalateur: ''
    }

    dispatch(fetchData(params))

    return response.data
  }
)

export const appSuiveChantierSlice = createSlice({
  name: 'appSuiveChantier',
  initialState: {
    data: [],
    total: 1,
    isLoading: false,
    params: {},
    count: 0,
    oneData: []
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
        state.oneData = []
        state.count = action.payload.count
      })
      .addCase(fetchData.rejected, state => {
        state.isLoading = false
      })
    builder
      .addCase(fetchOne.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchOne.fulfilled, (state, action) => {
        ;(state.oneData = action.payload), (state.data = []), (state.total = 1), (state.params = {}), (state.count = 0)
      })
      .addCase(fetchOne.rejected, state => {
        state.isLoading = false
      })
  }
})

export default appSuiveChantierSlice.reducer
