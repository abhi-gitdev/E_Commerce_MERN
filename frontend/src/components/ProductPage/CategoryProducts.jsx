import React, { useEffect, useState } from 'react'
import {
  useGetCategoryProductsQuery,
  useGetFilteredProductsQuery,
} from '../../redux/api/productSlice'
import ProductsCard from '../common/ProductsCard/ProductsCard'
import { Spinner } from '@chakra-ui/react'
import { useParams } from 'react-router'
import { useGetCategoriesQuery } from '../../redux/api/categoryApiSlice'
import {
  setCategories,
  setChecked,
  setProducts,
  setRadio,
} from '../../redux/features/auth/shopSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Input, InputAddon, Stack } from '@chakra-ui/react'
const CategoryProducts = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  )

  const categoriesQuery = useGetCategoriesQuery()
  const [priceFilter, setPriceFilter] = useState('')
  const filteredProductsQuery = useGetFilteredProductsQuery({ checked, radio })
  console.log(filteredProductsQuery?.data)
  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data))
    }
  }, [categoriesQuery.data, dispatch])
  useEffect(() => {
    dispatch(setChecked([]))
    dispatch(setChecked([params.id]))
  }, [params.id, dispatch])

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        //Filter Products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price <= parseInt(priceFilter, 10)
            )
          }
        )
        dispatch(setProducts(filteredProducts))
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter])
  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    )
    dispatch(setProducts(productsByBrand))
  }
  const handleCheck = (value, id) => {
    const updatedCheck = value
      ? [...checked, id]
      : checked.filter((c) => c !== id)
    dispatch(setChecked(updatedCheck))
  }
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ]
  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value)
  }
  if (filteredProductsQuery.isLoading) {
    return <Spinner size={'xl'} />
  }
  if (filteredProductsQuery.isError) {
    return <div className="error">Error loading products.</div>
  }
  return (
    <section className="ProductsPage">
      <div className="filterContainer">
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
              <label htmlFor={b}>{b}</label>{' '}
            </div>
          ))}
          <>
            <h2>Filter By Price</h2>
            <div className="listContainer">
              <Input
                type="text"
                value={priceFilter}
                onChange={handlePriceChange}
              />
            </div>
          </>
          <div className="resetContainer">
            <button
              onClick={() => window.location.reload()}
              className="resetBtn"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
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
    </section>
  )
}

export default CategoryProducts
