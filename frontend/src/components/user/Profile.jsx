import React, { useState, useEffect } from 'react'
import { useProfileMutation } from '../../redux/api/usersApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../common/Loader/Loader'
import { toast } from 'react-toastify'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { indianStates, indianCities } from '../data/indiaData'
import { RiUser3Fill } from 'react-icons/ri'
import { MdEmail } from 'react-icons/md'
import { FaAddressBook, FaPhoneAlt } from 'react-icons/fa'
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
      dispatch(setCredentials({ ...res }))
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error(error.data.message)
    }
  }

  return (
    <section className="profileContainer">
      <form className="profile" onSubmit={handleUpdate}>
        <h2 className="profileTitle">Edit Profile</h2>
        <div className="formGrid">
          <div className="inputGroup">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputGroup">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputGroup">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputGroup">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputGroup">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputGroup selectGroup">
            <label>State</label>
            <select
              name="state"
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
          </div>
          <div className="inputGroup selectGroup">
            <label>City</label>
            <select
              name="city"
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
        </div>
        <button type="submit" className="submitBtn">
          Update Profile
        </button>
      </form>
    </section>
  )
}

export default Profile
