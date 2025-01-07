import React from 'react'
import { useGetNewProductsQuery } from '../../redux/api/productSlice'
import ProductsCard from '../common/ProductsCard/ProductsCard'
import { Spinner } from '@chakra-ui/react'

const NewProducts = () => {
  const { data: products, isLoading } = useGetNewProductsQuery()
  if (isLoading) {
    return <Spinner size={'xl'} />
  }
  return (
    <div id="newProducts">
      <h1 className="homeHead">New Arrivals</h1>
      <div className="productsCards">
        {products?.map((product, i) => {
          return <ProductsCard product={product} />
        })}
      </div>
    </div>
  )
}

export default NewProducts
