import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from '@reduxjs/toolkit'

import { composeWithDevTools } from '@redux-devtools/extension'

export const store = configureStore({
  reducer: {},
})
