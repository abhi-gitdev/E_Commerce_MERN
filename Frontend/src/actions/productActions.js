import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProduct = createAsyncThunk(
  'products/getProduct',
  async ({ keyword = '', currentPage = 1 }) => {
    try {
      console.log(keyword, currentPage)
      let link = `/api/products/products?keyword=${keyword}&page=${currentPage}`
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
