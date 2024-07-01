import { createSlice } from '@reduxjs/toolkit'
import { getProduct, getProductDetails } from '../actions/productActions'

const initialProductsState = {
  products: [],
  loading: false,
  error: null,
  productsCount: 0,
  resultPerPage: 8,
}

const initialProductState = { loading: false, error: null, product: {} }

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
        state.products = action.payload.products
        state.productsCount = action.payload.productsCount
        state.resultPerPage = action.payload.resultPerPage
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

const productDetailsSlice = createSlice({
  name: 'product',
  initialState: initialProductState,
  reducers: {
    clearErrors: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false
        console.log(action.payload)
        state.product = action.payload
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearErrors } = productsSlice.actions
export const productsReducer = productsSlice.reducer
export const productDetailsReducer = productDetailsSlice.reducer
