import React, { useEffect } from 'react'
import Loader from '../loader/Loader'
import Product from './Product'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearErrors } from '../../features/productSlice'
import { getProduct } from '../../actions/productActions'
import './Products.css'
const Products = () => {
  const dispatch = useDispatch()
  const { loading, error, products, productsCount, resultPerPage } =
    useSelector((state) => state.products)
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProduct())
  }, [dispatch, error])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="catalog">
          <h3 className="catalogHeading">Catalog</h3>
          <div className="catalogBody">
            <div className="filters"></div>
            <div className="productCards">
              {products &&
                products.map((p) => (
                  <Product key={p._id} product={p}></Product>
                ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Products
