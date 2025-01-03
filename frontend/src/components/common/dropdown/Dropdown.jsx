import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { logout } from '../../../redux/features/auth/authSlice'
import { useLogoutMutation } from '../../../redux/api/usersApiSlice'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from '@chakra-ui/react'
import './Dropdown.css'

const Dropdown = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [logoutApiCall] = useLogoutMutation()
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
    <>
      <MenuList>
        <MenuGroup>
          <Link to={'/profile'}>
            <MenuItem>Profile</MenuItem>
          </Link>
          <Link to={'/my-orders'}>
            <MenuItem>My orders</MenuItem>
          </Link>
          {userInfo && userInfo.role == 'admin' && (
            <>
              <Link to={'/admin/dashboard'}>
                <MenuItem>Dashboard</MenuItem>
              </Link>
              <Link to={'/admin/productsList'}>
                <MenuItem>Products</MenuItem>
              </Link>
              <Link to={'/admin/categoryList'}>
                <MenuItem>Category</MenuItem>
              </Link>
              <Link to={'/admin/orders'}>
                <MenuItem>Orders</MenuItem>
              </Link>
              <Link to={'/admin/users'}>
                <MenuItem>Users</MenuItem>
              </Link>
            </>
          )}
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <Link onClick={handleLogout}>
            <MenuItem>Logout</MenuItem>
          </Link>
        </MenuGroup>
      </MenuList>
    </>
  )
}

export default Dropdown
