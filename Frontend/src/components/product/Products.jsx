import React, { useEffect, useState } from 'react'
import Loader from '../loader/Loader'
import Product from './Product'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearErrors } from '../../features/productSlice'
import { getProduct } from '../../actions/productActions'
import './Products.css'
import Pagination from 'react-js-pagination'
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb'
import { useParams } from 'react-router-dom'

const Products = () => {
  const params = useParams()
  const keyword = params.keyword
  const [currentPage, setCurrentPage] = useState(1)
  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  const dispatch = useDispatch()
  const { loading, error, products, productsCount, resultPerPage } =
    useSelector((state) => state.products)
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProduct({ keyword, currentPage }))
  }, [dispatch, error, keyword, currentPage])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
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
          <div className="paginationContainer">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText={<TbPlayerTrackNext />}
              prevPageText={<TbPlayerTrackPrev />}
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            ></Pagination>
          </div>
        </>
      )}
    </>
  )
}

export default Products
