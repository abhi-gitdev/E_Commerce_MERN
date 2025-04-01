import React, { useEffect, useState } from 'react'
import {
  setCategories,
  setChecked,
  setProducts,
  setRadio,
} from './../../redux/features/auth/shopSlice'
import { useGetCategoriesQuery } from './../../redux/api/categoryApiSlice'
import { Input } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetFilteredProductsQuery } from '../../redux/api/productSlice'
import ProductsCard from '../common/ProductsCard/ProductsCard'
import './Shop.css'

const Shop = () => {
  const dispatch = useDispatch()
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  )
  const categoriesQuery = useGetCategoriesQuery()
  const [priceFilter, setPriceFilter] = useState('')
  const filteredProductsQuery = useGetFilteredProductsQuery({ checked, radio })

  console.log(filteredProductsQuery?.data)

  // Set categories once fetched
  useEffect(() => {
    if (!categoriesQuery.isLoading && categoriesQuery.data) {
      dispatch(setCategories(categoriesQuery.data))
    }
  }, [categoriesQuery.data, dispatch])

  // Handle filtering when checked categories, radio selection, or price changes
  useEffect(() => {
    if (!filteredProductsQuery.isLoading && filteredProductsQuery.data) {
      const filteredProducts = filteredProductsQuery.data.filter((product) => {
        return (
          (checked.length === 0 || checked.includes(product.category)) &&
          (priceFilter === '' ||
            product.price.toString().includes(priceFilter) ||
            product.price <= parseInt(priceFilter, 10))
        )
      })
      dispatch(setProducts(filteredProducts))
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter])

  // Handle category selection
  const handleCheck = (value, id) => {
    const updatedCheck = value
      ? [...checked, id]
      : checked.filter((c) => c !== id)
    dispatch(setChecked(updatedCheck))
  }

  // Handle brand selection
  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    )
    dispatch(setProducts(productsByBrand))
  }

  // Get unique brands from filtered products
  const uniqueBrands = [
    ...new Set(
      filteredProductsQuery.data
        ?.map((product) => product.brand)
        .filter(Boolean)
    ),
  ]

  // Handle price filter change
  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value)
  }

  return (
    <section className="ProductsPage">
      <div className="filterContainer">
        <h2>Filter By Categories</h2>
        <div className="listContainer">
          {categories?.map((c) => (
            <div key={c._id}>
              <input
                type="checkbox"
                id={c._id}
                name={c._id}
                checked={checked.includes(c._id)}
                onChange={(e) => handleCheck(e.target.checked, c._id)}
              />
              <label htmlFor={c._id}>{c?.name}</label>
            </div>
          ))}
        </div>

        <h2>Filter By Brands</h2>
        <div className="listContainer">
          {uniqueBrands?.map((b) => (
            <div key={b}>
              <input
                type="radio"
                id={b}
                name="brand"
                onChange={() => handleBrandClick(b)}
              />
              <label htmlFor={b}>{b}</label>
            </div>
          ))}
        </div>

        <h2>Filter By Price</h2>
        <div className="listContainer">
          <Input type="text" value={priceFilter} onChange={handlePriceChange} />
        </div>

        <div className="resetContainer">
          <button onClick={() => window.location.reload()} className="resetBtn">
            Reset
          </button>
        </div>
      </div>

      <div id="allProducts">
        <h1>All Products ({products.length})</h1>
        <div className="productsCards">
          {products.map((product, i) => (
            <ProductsCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Shop
