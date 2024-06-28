export {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUESTS,
} from '../constants/productConstants'

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProduct = createAsyncThunk(
  'products/getProduct',
  async (
    {
      keyword = '',
      currentPage = 1,
      price = [0, 25000],
      category,
      ratings = 0,
    },
    { rejectWithValue }
  ) => {
    try {
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
      }

      const { data } = await axios.get(link)

      return data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)
