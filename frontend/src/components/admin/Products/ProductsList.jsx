import React from 'react'
import AdminMenu from './AdminMenu'
import ProductsCard from '../../common/ProductsCard/ProductsCard'
import './ProductsList.css'
const ProductsList = () => {
  return (
    <div id="ProductsList">
      <AdminMenu></AdminMenu>
      <div className="productsCards">
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
      </div>
    </div>
  )
}

export default ProductsList
