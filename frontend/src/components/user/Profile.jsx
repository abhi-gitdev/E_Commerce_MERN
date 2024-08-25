import React, { useState, useEffect } from 'react'
import { useProfileMutation } from '../../redux/api/usersApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../common/Loader/Loader'
import { toast } from 'react-toastify'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { indianStates, indianCities } from '../data/indiaData'
import { RiUser3Fill, RiLockPasswordFill } from 'react-icons/ri'
import { MdEmail } from 'react-icons/md'
import { FaAddressBook } from 'react-icons/fa6'
import { FaPhoneAlt } from 'react-icons/fa'

import './Profile.css'
const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    state: '',
    city: '',
  })

  const { userInfo } = useSelector((state) => state.auth)
  const [updateProfileApi, { isLoading }] = useProfileMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    setFormData({ ...userInfo, password: '' })
  }, [userInfo])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const res = await updateProfileApi(formData).unwrap()
      console.log(res)
      dispatch(setCredentials({ ...res }))
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error(error.data.message)
    }
  }

  return (
    <section className="profileContainer">
      <form className="profile" onSubmit={handleUpdate}>
        <div className="ipContainer slideUp">
          <RiUser3Fill className="icon stick" />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <label htmlFor="firstName">First Name:</label>
        </div>
        <div className="ipContainer slideUp">
          <RiUser3Fill className="icon stick" />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <label htmlFor="lastName">Last Name:</label>
        </div>
        <div className="ipContainer slideUp">
          <MdEmail className="icon stick" />

          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email:</label>
        </div>
        <div className="ipContainer slideUp">
          <FaPhoneAlt className="icon stick" />
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <label htmlFor="phone">Phone Number:</label>
        </div>
        <div className="ipContainer slideUp">
          <FaAddressBook className="icon stick" />
          <input
            type="text"
            name="address"
            onChange={handleChange}
            value={formData.address}
            required
          />
          <label htmlFor="address">Address:</label>
        </div>
        <div
          style={{
            width: '100%',
            justifyContent: 'space-evenly',
            margin: '10px',
          }}
        >
          <label htmlFor="state">State:</label>
          <select
            name="state"
            className="selectField"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="">Select a state</option>
            {indianStates.map((state, i) => (
              <option key={`state-${i}`} value={state}>
                {state}
              </option>
            ))}
          </select>
          <label htmlFor="city">City:</label>
          <select
            name="city"
            className="selectField"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select a city</option>
            {indianCities.map((city, i) => (
              <option key={`city-${i}`} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="subBtn btn"
          style={{ justifyContent: 'center', margin: '0', marginTop: '30px' }}
        >
          Update
        </button>
      </form>
    </section>
  )
}

export default Profile
