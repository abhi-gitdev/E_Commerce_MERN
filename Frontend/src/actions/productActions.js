import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProduct = createAsyncThunk('products/getProduct', async () => {
  try {
    const response = await axios.get('/api/products/')
    return response.data
  } catch (error) {
    return Promise.reject(error.message)
  }
})

export const getProductDetails = createAsyncThunk(
  '/product/getProductDetails',
  async () => {
    try {
      const response = await axios('/api/products/:id')
      return response.data
    } catch (error) {
      return Promise.reject(error.message)
    }
  }
)
