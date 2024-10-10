import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IMainState, TChatRoom, TColorMode, TUserDetails } from './types'


// Define the initial state using that type
const initialState: IMainState = {
  isLoggedIn: false,
  user_details: undefined,
  duration: '',
  chat_rooms: [],
  color_mode: 'system'
}

export const mainSlice = createSlice({
  name: 'main',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    updateUserDetails: (state, action: PayloadAction<TUserDetails>) => {
      state.user_details = action.payload
    },
    updateDuration: (state, action: PayloadAction<string>) => {
      state.duration = action.payload
    },
    updateChatRoom: (state, action: PayloadAction<TChatRoom[]>) => {
      state.chat_rooms = action.payload
    },
    updateColorMode: (state, action: PayloadAction<TColorMode>) => {
      state.color_mode = action.payload
    },
  },
})

export const { 
    setIsLoggedIn,
    updateUserDetails,
    updateDuration,
    updateChatRoom,
    updateColorMode
} = mainSlice.actions

export default mainSlice.reducer