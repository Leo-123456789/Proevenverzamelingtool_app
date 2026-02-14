import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UIState {
  alertMessage: string | null
  alertType: 'success' | 'error' | 'info' | 'warning'
  showAlert: boolean
}

const initialState: UIState = {
  alertMessage: null,
  alertType: 'info',
  showAlert: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' | 'warning' }>) => {
      state.alertMessage = action.payload.message
      state.alertType = action.payload.type
      state.showAlert = true
    },
    hideAlert: (state) => {
      state.showAlert = false
      state.alertMessage = null
    },
  },
})

export const { showAlert, hideAlert } = uiSlice.actions
export default uiSlice.reducer
