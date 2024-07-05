import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProduct = createAsyncThunk(
  'products/getProduct',
  async (keyword = '') => {
    try {
      let link = `/api/products?keyword=${keyword}`
      const response = await axios.get(link)
      return response.data
    } catch (error) {
      return Promise.reject(error.message)
    }
  }
)

export const getProductDetails = createAsyncThunk(
  '/product/getProductDetails',
  async (id) => {
    try {
      const response = await axios.get(`/api/products/product/${id}`)
      return response.data
    } catch (error) {
      return Promise.reject(error.message)
    }
  }
)
