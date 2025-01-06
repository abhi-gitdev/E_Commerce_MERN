import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { RiMenu3Fill } from 'react-icons/ri'
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
import { useSelector } from 'react-redux'

const AdminMenu = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <>
      <Menu>
        <MenuButton id="menuBtn" onClick={toggleMenu}>
          {isMenuOpen ? (
            <FaTimes className="icon" />
          ) : (
            <RiMenu3Fill className="icon" />
          )}
        </MenuButton>
        <MenuList>
          <MenuGroup>
            {userInfo && userInfo.role == 'admin' && (
              <>
                <NavLink to={'/admin/dashboard'}>
                  <MenuItem>Dashboard</MenuItem>
                </NavLink>
                <NavLink to={'/admin/allProducts'}>
                  <MenuItem>Products</MenuItem>
                </NavLink>
                <NavLink to={'/admin/categoryList'}>
                  <MenuItem>Create Category</MenuItem>
                </NavLink>
                <NavLink to={'/admin/orders'}>
                  <MenuItem>Orders</MenuItem>
                </NavLink>
                <NavLink to={'/admin/users'}>
                  <MenuItem>Users</MenuItem>
                </NavLink>
                <NavLink to={'/admin/updateProduct'}>
                  <MenuItem>Update Product</MenuItem>
                </NavLink>
                <NavLink to={'/admin/createProduct'}>
                  <MenuItem>Create Product</MenuItem>
                </NavLink>
                <NavLink to={'/admin/allProducts'}>
                  <MenuItem>All Products</MenuItem>
                </NavLink>
              </>
            )}
          </MenuGroup>
        </MenuList>
      </Menu>
    </>
  )
}
export default AdminMenu
