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
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const Products = () => {
  const dispatch = useDispatch()
  const params = useParams()
  let keyword = para.keyword
  const navigate = useNavigate()

  const { loading, error, products, productsCount, resultPerPage } =
    useSelector((state) => state.products)

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage))
  }, [dispatch, keyword, currentPage])

  useEffect(() => {
    if (error) {
      navigate('/products')
      toast.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, error])

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  const totalPages = Math.ceil(productsCount / resultPerPage)

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
              {products && products.length > 0 ? (
                products.map((p) => <Product key={p._id} product={p}></Product>)
              ) : (
                <p>No products found</p>
              )}
            </div>
          </div>
          <Stack spacing={2} alignItems="center" className="pagination">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              color="standard"
            />
          </Stack>
        </section>
      )}
    </>
  )
}

export default Products
