import React from 'react'
import { useGetTopProductsQuery } from '../../redux/api/productSlice'
import ProductsCard from '../common/ProductsCard/ProductsCard'
import { Spinner } from '@chakra-ui/react'

const GetTopProducts = () => {
  const { data: products, isLoading } = useGetTopProductsQuery()
  if (isLoading) {
    return <Spinner size={'xl'} />
  }
  return (
    <div id="topProducts">
      <h1 className="homeHead">Special Products</h1>
      <div className="productsCards">
        {products.map((product, i) => {
          return <ProductsCard product={product} />
        })}
      </div>
    </div>
  )
}

export default GetTopProducts
