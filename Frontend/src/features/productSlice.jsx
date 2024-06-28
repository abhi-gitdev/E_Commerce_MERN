import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUESTS,
  CLEAR_ERRORS,
} from '../constants/productConstants'
import { createSlice } from '@reduxjs/toolkit'

const initialProductsState = {
  products: [],
}
const productsSlice = createSlice({
  name: 'products',
  initialState: initialProductsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ALL_PRODUCT_REQUESTS, (state) => {
        state.loading = true
        state.products = []
      })
      .addCase(ALL_PRODUCT_SUCCESS, (state, action) => {
        state.loading = false
        state.products = action.payload.products
        state.productsCount = action.payload.productsCount
        state.resultPerPage = action.payload.resultPerPage
        state.filteredProductsCount = action.payload.filteredProductsCount
      })
      .addCase(ALL_PRODUCT_FAIL, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(CLEAR_ERRORS, (state) => {
        state.error = null
      })
  },
})

export const productsReducer = productsSlice.reducer
