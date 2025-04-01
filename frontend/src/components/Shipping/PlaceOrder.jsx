import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useCreateOrderMutation } from '../../redux/api/orderApiSlice'

const PlaceOrder = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const [createOrder, { isLoading, isError }] = useCreateOrderMutation()
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping')
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate])
  return <div></div>
}

export default PlaceOrder
