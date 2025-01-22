import React from 'react'
import { useGetCategoryProductsQuery } from '../../redux/api/productSlice'
import ProductsCard from '../common/ProductsCard/ProductsCard'
import { Spinner } from '@chakra-ui/react'
import { useParams } from 'react-router'
import { useGetCategoriesQuery } from '../../redux/api/categoryApiSlice'

const CategoryProducts = () => {
  const params = useParams()
  const {
    data: products,
    isLoading,
    isError,
  } = useGetCategoryProductsQuery(params.id)
  const { data: categories } = useGetCategoriesQuery()
  if (isLoading) {
    return <Spinner size={'xl'} />
  }
  if (isError) {
    return <div className="error">Error loading products.</div>
  }
  return (
    <div id="allProducts">
      <h1>
        {categories.map((category) => {
          return category._id == params.id ? category.name : ''
        })}{' '}
        Products({products.length})
      </h1>
      <div className="productsCards">
        {products.map((product, i) => {
          return <ProductsCard product={product} />
        })}
      </div>
    </div>
  )
}

export default CategoryProducts
