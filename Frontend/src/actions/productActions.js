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
      console.log(id)
      console.log('iyfu')
      const response = await axios.get(`/api/products/product/${id}`)
      console.log('Product Details Response:', response) // Log response for debugging
      return response.data
    } catch (error) {
      console.error('Error fetching product details:', error.message) // Log error for debugging
      return Promise.reject(error.message)
    }
  }
)
