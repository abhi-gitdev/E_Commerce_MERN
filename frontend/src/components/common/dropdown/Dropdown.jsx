import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { logout } from '../../../redux/features/auth/authSlice'
import { useLogoutMutation } from '../../../redux/api/usersApiSlice'
import './Dropdown.css'

const Dropdown = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [logoutApiCall] = useLogoutMutation()
  console.log(logoutApiCall)
  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="dropdown" style={{}}>
      <ul
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        <Link to={'/profile'}>Profile</Link>
        {userInfo && userInfo.role == 'admin' && (
          <>
            <Link to={'/admin/dashboard'}>Dashboard</Link>
            <Link to={'/admin/products'}>Products</Link>
            <Link to={'/admin/category'}>Category</Link>
            <Link to={'/admin/orders'}>Orders</Link>
            <Link to={'/admin/users'}>Users</Link>
          </>
        )}
        <Link to={'/my-orders'}>My orders</Link>
        <Link onClick={handleLogout}>Logout</Link>
      </ul>
    </div>
  )
}

export default Dropdown
