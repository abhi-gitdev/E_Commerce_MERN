import { apiSlice } from './apiSlice'
import { PRODUCT_URL } from '../constants'

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword }) => ({
        url: `${PRODUCT_URL}`,
        params: { keyword },
      }),
      providesTags: ['Product'],
    }),
    getProductById: builder.query({
      query: (productId) => `${PRODUCT_URL}/${productId}`,
      providesTags: (result, error, productId) => [
        { type: 'Product', id: productId },
      ],
    }),
    allProducts: builder.query({
      query: () => `${PRODUCT_URL}/allProducts`,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: ({ data, productId }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        body: data,
        method: 'PUT',
        credentials: 'include',
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      providesTags: ['Product'],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),
    getNewProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/new`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetNewProductsQuery,
  useAllProductsQuery,
  useCreateProductMutation,
  useCreateReviewMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useGetProductDetailsQuery,
  useGetProductsQuery,
  useGetTopProductsQuery,
  useUpdateProductMutation,
} = productApiSlice
