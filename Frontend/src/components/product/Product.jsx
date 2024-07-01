import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../../actions/productActions'
import { toast } from 'react-toastify'
import { clearErrors } from '../../features/productSlice'

const Product = ({ product }) => {
  const dispatch = useDispatch()
  const options = {
    edit: false,
    color: 'rgba(20, 20, 20, 0.3)',
    activeColor: 'orange',
    value: `${product.rating}`,
    isHalf: true,
    size: window.innerWidth < 1080 ? 17 : 20,
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
          <ReactStars {...options} />
          <span>({product.numOfReviews} Reviews)</span>
        </div>
        <span>₹{product.price}</span>
      </Link>
    </div>
  )
}

export default Product
