import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUESTS,
} from '../constants/productConstants'
import { createSlice } from '@reduxjs/toolkit'
import { getProduct } from '../actions/productActions'
const initialProductsState = {
  products: [],
}

const productsSlice = createSlice({
  name: 'products',
  initialState: initialProductsState,
  reducers: {
    CLEAR_ERRORS: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true
        state.products = []
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload.products
        state.productsCount = action.payload.productsCount
        state.resultPerPage = action.payload.resultPerPage
        state.filteredProductsCount = action.payload.filteredProductsCount
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(CLEAR_ERRORS, (state) => {
        state.error = null
      })
  },
})

export const productsReducer = productsSlice.reducer
export const { CLEAR_ERRORS } = productsSlice.actions
