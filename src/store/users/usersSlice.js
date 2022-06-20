import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    value: []
  },
  reducers: {
    addUsers: (state, action) => {
      state.value = [...state.value, ...action.payload]
    }
  }
})

export const { addUsers } = usersSlice.actions

export const selectUsers = state => state.users.value

export default usersSlice.reducer
