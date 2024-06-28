import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'

const options = {
  edit: false,
  color: 'rgba(20, 20, 20, 0.3)',
  activeColor: 'orange',
  value: 2.5,
  isHalf: true,
  size: window.innerWidth < 1080 ? 17 : 20,
}

const Product = ({ product }) => {
  console.log(product._id)
  return (
    <div className="productDiv">
      <Link className="productCard" to={product._id}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
          <ReactStars {...options} /> <span>(250 Reviews)</span>
        </div>
        <span>₹{product.price}</span>
      </Link>
    </div>
  )
}

export default Product
