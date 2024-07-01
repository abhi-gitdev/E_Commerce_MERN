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
  async (id) => {
    try {
      const response = await axios.get(`/api/products/:${id}`)
      console.log(response)
      return response.data
    } catch (error) {
      return Promise.reject(error.message)
    }
  }
)
