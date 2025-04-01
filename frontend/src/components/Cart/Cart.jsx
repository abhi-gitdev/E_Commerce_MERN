import React, { useEffect, useState } from 'react'
import { addToCart, removeFromCart } from '../../redux/features/auth/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../../redux/constants'
import { MdDeleteOutline } from 'react-icons/md'
import { v4 as uuid4 } from 'uuid'
import { IoBagCheckOutline } from 'react-icons/io5'

import './Cart.css'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)
  const [quantities, setQuantities] = useState([])
  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }))
  }
  console.log(cartItems)
  const [total, setTotal] = useState(0)
  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    )
    setTotal(totalPrice)
  }, [cartItems])

  return (
    <section id="cartPage">
      <p className="homeHead homeHead2">Shopping Bag</p>
      <div className="cartItems">
        <div className="cartHeader">
          <p className="first">Product</p>
          <p className="second">Quantity</p>
          <p>Price</p>
          <p></p>
        </div>
        {cartItems.map((cartItem) => {
          return (
            <div className="cartItem" key={uuid4()}>
              <img
                src={`${BASE_URL}/product/${cartItem.images[0]}`}
                alt=""
                className="cartItemImg"
              />
              <div className="cartsDiv2">
                <Link to={`/product/${cartItem._id}`} className="cartItemName">
                  {cartItem.name}
                </Link>
                <p className="cartItemBrand">{cartItem.brand}</p>
                <div className="cartsDiv1">
                  <p className="cartItemFreeDelivery">
                    {cartItem.price * cartItem.qty > 400
                      ? 'Free Delivery |'
                      : ''}
                  </p>
                  <p className="cartItemStock">
                    {cartItem.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
              </div>
              <div className="qtyDiv">
                <button
                  className="qtBtn"
                  onClick={() =>
                    cartItem.qty > 1 &&
                    addToCartHandler(cartItem, Number(cartItem.qty - 1))
                  }
                >
                  -
                </button>
                <input type="number" value={cartItem.qty} />
                <button
                  className="qtBtn"
                  onClick={() =>
                    cartItem.qty <= cartItem.countInStock &&
                    addToCartHandler(cartItem, Number(cartItem.qty + 1))
                  }
                >
                  +
                </button>
              </div>
              <p className="cartItemTotalPrice">
                ₹{cartItem.price * cartItem.qty}
              </p>
              <button
                className="cartItemRemoveBtn"
                onClick={() => dispatch(removeFromCart(cartItem._id))}
              >
                <MdDeleteOutline className="icon" />
              </button>
            </div>
          )
        })}
        <div className="bottomCheckout">
          <p>Total: </p>
          <p>
            ₹<span style={{ fontSize: '25px' }}>{total}</span>
          </p>
        </div>
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
        >
          <button className="checkout" onClick={() => navigate('/shipping')}>
            <IoBagCheckOutline />
            CHECKOUT
          </button>
        </div>
      </div>
    </section>
  )
}

export default Cart
