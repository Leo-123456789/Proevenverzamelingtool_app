import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DataState {
  fileName: string | null
  data: unknown[][]
  headers: string[]
  isLoading: boolean
  error: string | null
}

const initialState: DataState = {
  fileName: null,
  data: [],
  headers: [],
  isLoading: false,
  error: null,
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setFileData: (state, action: PayloadAction<{ fileName: string; data: unknown[][]; headers: string[] }>) => {
      state.fileName = action.payload.fileName
      state.data = action.payload.data
      state.headers = action.payload.headers
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    clearData: (state) => {
      state.fileName = null
      state.data = []
      state.headers = []
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { setFileData, setLoading, setError, clearData, clearError } = dataSlice.actions
export default dataSlice.reducer
