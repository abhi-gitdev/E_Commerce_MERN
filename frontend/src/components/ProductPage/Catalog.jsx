import React from 'react'
import { useAllProductsQuery } from '../../redux/api/productSlice'
import { Spinner } from '@chakra-ui/react'
import ProductsCard from '../common/ProductsCard/ProductsCard'

const Catalog = () => {
  const { data: products, isLoading, isError, refetch } = useAllProductsQuery()
  if (isLoading) {
    return <Spinner size={'xl'} />
  }
  if (isError) {
    return <div className="error">Error loading products.</div>
  }
  return (
    <div id="allProducts">
      <h1>Catalog({products.length})</h1>
      <div className="productsCards">
        {products.map((product, i) => {
          return <ProductsCard product={product} refetch={refetch} />
        })}
      </div>
    </div>
  )
}

export default Catalog
