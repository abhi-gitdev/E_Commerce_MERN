import { createSlice } from '@reduxjs/toolkit'
import { getProduct } from '../actions/productActions'
import { act } from 'react'

const initialProductsState = {
  products: [],
  loading: false,
  error: null,
  productsCount: 0,
  resultPerPage: 10,
  filteredProductsCount: 0,
}

const productsSlice = createSlice({
  name: 'products',
  initialState: initialProductsState,
  reducers: {
    clearErrors: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true
        state.products = []
        state.error = null
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false
        console.log(action)
        state.products = action.payload.products
        state.productsCount = action.payload.productsCount
        state.resultPerPage = action.payload.resultPerPage
        state.filteredProductsCount = action.payload.filteredProductsCount
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearErrors } = productsSlice.actions
export const productsReducer = productsSlice.reducer
