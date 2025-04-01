import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from './api/apiSlice'
import authReducer from './features/auth/authSlice.js'
import cartSliceReducer from './features/auth/cartSlice.js'
import shopSliceReducer from './features/auth/shopSlice.js'
import favoriteSliceReducer from './features/auth/favoriteSlice.js'
import { getFavoritesFromLocalStorage } from '../Utils/localStorage.js'

const initialFavorites = getFavoritesFromLocalStorage() || []

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Manages API state
    auth: authReducer,
    cart: cartSliceReducer,
    shop: shopSliceReducer,
    favorites: favoriteSliceReducer,
  },
  preloadedState: {
    favorites: initialFavorites,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Adds RTK Query middleware
  devTools: true, // Enables Redux DevTools in development
})

// Enables automatic query refetching on focus, reconnect, etc.
setupListeners(store.dispatch)

export default store
