import { createSlice } from '@reduxjs/toolkit'

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      if (!action.payload || !action.payload._id) {
        console.error('Invalid product added to favorites:', action.payload)
        return
      }

      if (!state.some((product) => product?._id === action.payload?._id)) {
        state.push(action.payload)
      }
    },
    removeFromFavorites: (state, action) => {
      if (!action.payload || !action.payload._id) {
        console.error('Invalid product removed from favorites:', action.payload)
        return state // Prevent crash
      }

      return state.filter((product) => product?._id !== action.payload?._id)
    },
    setFavorites: (state, action) => {
      if (!Array.isArray(action.payload)) {
        console.error('Invalid favorites array:', action.payload)
        return state
      }
      return action.payload
    },
  },
})

export const { addToFavorites, removeFromFavorites, setFavorites } =
  favoriteSlice.actions
export default favoriteSlice.reducer
