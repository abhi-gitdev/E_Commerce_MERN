import React from 'react'

import Rating from '@mui/material/Rating'
import { Link } from 'react-router-dom'

const ProductsList = () => {
  const product = {
    _id: '12345',
    brand: 'Wildcraft',
    name: 'WES Formals by Westside Beige Slim-Fit Blazer',
    price: 5500,
    rating: 4.5,
    image: 'https://m.media-amazon.com/images/I/61nXI-t6D3L._SX679_.jpg',
    numOfReviews: 180,
    description:
      'wmnbdvgjmdnnnnnnnnnnnnnnnnnnnnnnnnnnnnfffffffffffffffffffffffffffffffffffffffff dddddddddddddddddddddddddddddddnemwwwwwwwwwwwwwwww m ennnnnnnnnnnnnnnnnnnnnnnnsf nnnnnnnnnnnnnnnnn',
  }

  return (
    <>
      <div className="cardContainer2">
        <img src={product.image} alt={product.name} className="pImg" />
        <div className="cardInfo">
          <p className="pBrand">{product.name}</p>
          <p className="pName">{product.description.substring(0, 100)}...</p>
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
      </div>
    </>
  )
}

export default ProductsList
