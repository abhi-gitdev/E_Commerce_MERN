import { configureStore } from '@reduxjs/toolkit'

import { productDetailsReducer, productsReducer } from './features/productSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
  },
})
