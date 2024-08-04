import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProduct = createAsyncThunk(
  'products/getProduct',
  async (keyword = '', { rejectWithValue }) => {
    try {
      console.log(keyword)
      let link = `/api/products/products?keyword=${keyword}`
      const response = await axios.get(link)
      return response.data
    } catch (error) {
      console.log(error)
      keyword = ''
      console.log('error')
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const getProductDetails = createAsyncThunk(
  '/product/getProductDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/products/product/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
