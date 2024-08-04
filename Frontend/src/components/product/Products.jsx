import React, { useEffect, useState } from 'react'
import Loader from '../loader/Loader'
import Product from './Product'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearErrors } from '../../features/productSlice'
import { getProduct } from '../../actions/productActions'
import './Products.css'
import './Search.css'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom'
const Products = () => {
  const dispatch = useDispatch()
  let keyword = useParams().keyword
  console.log(keyword)
  const navigate = useNavigate()

  // const [keyword, setKeyword] = useState('')
  const { loading, error, products, productsCount, resultPerPage } =
    useSelector((state) => state.products)
  useEffect(() => {
    dispatch(getProduct(keyword))
    keyword = ''
  }, [dispatch, keyword])
  useEffect(() => {
    if (error) {
      navigate('/products')
      toast.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, error])
  // const handleSearchSubmit = (e) => {
  //   e.preventDefault()
  //   dispatch(getProduct(keyword))
  // }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="catalog">
          <h3 className="catalogHeading">Catalog</h3>
          {/* <form className="searchBox" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search here..."
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" className="searchSbmt">
              <IoSearchOutline className="searchSbmtIcon" />
            </button>
          </form> */}
          <div className="catalogBody">
            <div className="filters"></div>
            <div className="productCards">
              {products && products.length > 0 ? (
                products.map((p) => <Product key={p._id} product={p}></Product>)
              ) : (
                <p>No products found</p>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Products
