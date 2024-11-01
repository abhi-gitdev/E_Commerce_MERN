import React from 'react'
import Rating from '@mui/material/Rating'
import { Link } from 'react-router-dom'
import './ProductCard.css'

const ProductCard = () => {
  const product = {
    _id: '12345',
    brand: 'Wildcraft',
    name: 'WES Formals by Westside Beige Slim-Fit Blazer',
    price: 5500,
    rating: 4.5,
    image: 'https://m.media-amazon.com/images/I/61nXI-t6D3L._SX679_.jpg',
    numOfReviews: 180,
  }

  return (
    <div className="cardContainer">
      <Link to={`product/${product._id}`}>
        <img src={product.image} alt={product.name} className="pImg" />
        <div className="cardInfo">
          <p className="pBrand">{product.brand}</p>
          <p className="pName">{product.name}</p>
          <div className="rating">
            <Rating
              name="product-rating"
              defaultValue={product.rating}
              precision={0.5}
              readOnly
            />
            <span>({product.numOfReviews} Reviews)</span>
          </div>
          <b>₹{product.price}</b>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
