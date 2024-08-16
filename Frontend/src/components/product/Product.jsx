import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Rating } from '@mui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../../actions/productActions'
import { toast } from 'react-toastify'
import { clearErrors } from '../../features/productSlice'

const Product = ({ product }) => {
  const dispatch = useDispatch()

  const options = {
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  }
  useEffect(() => {
    dispatch(getProductDetails(product._id))
    return () => {
      dispatch(clearErrors())
    }
  }, [dispatch])
  return (
    <div className="productDiv">
      <Link className="productCard" to={`product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
          <Rating {...options} /> <span>({product.numOfReviews} Reviews)</span>
        </div>
        <span>₹{product.price}</span>
      </Link>
    </div>
  )
}

export default Product
