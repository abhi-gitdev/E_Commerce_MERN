import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from '@reduxjs/toolkit'

import { composeWithDevTools } from '@redux-devtools/extension'
import { productDetailsReducer, productsReducer } from './features/productSlice'

const reducer = {}

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
  },
})
