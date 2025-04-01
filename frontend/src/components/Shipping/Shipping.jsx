import './Shipping.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Input } from '@chakra-ui/react'

const Shipping = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { shippingAddress } = useSelector((state) => state.cart)
  const [paymentMethod, setPaymentMethod] = useState('Cash-on-Delivery')
  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress.address || '')
  const [country, setCountry] = useState(shippingAddress.address || '')

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping')
    }
  }, [navigate, shippingAddress])

  return (
    <div className="shipping">
      <div className="shippingFormContainer">
        <form action="" className="shippingForm">
          <div className="ipContainer">
            <label htmlFor="address">Address:</label>
            <Input
              border={'1px'}
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="ipContainer">
            <label htmlFor="city">City:</label>
            <Input
              border={'1px'}
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="ipContainer">
            <label htmlFor="postalCode">Postal Code:</label>
            <Input
              border={'1px'}
              name="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          <div className="ipContainer">
            <label htmlFor="country">Country:</label>
            <Input
              border={'1px'}
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div className="ipContainer">
            <p className="pm">Select payment method:</p>
            <input
              type="radio"
              name="paymentMethod"
              id="paymentMethod"
              required
              style={{ marginRight: '5px' }}
            />
            <label htmlFor="paymentMethod">Cash-on-Delivery</label>
          </div>
          <button type="submit" className="btn cont">
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}

export default Shipping
