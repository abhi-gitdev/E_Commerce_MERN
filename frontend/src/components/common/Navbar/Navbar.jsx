import React, { useState } from 'react'
import { IoBagOutline } from 'react-icons/io5'
import { Link, NavLink, useNavigate } from 'react-router-dom' // Use NavLink instead of Link
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../../../redux/constants'
import Dropdown from '../dropdown/Dropdown'
import profileImg from '../../../assets/profile.png'
import { Menu, MenuButton } from '@chakra-ui/react'
import Sidebar from './SideBar/Sidebar'
import { IoMenu } from 'react-icons/io5'

import './Navbar.css'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const { userInfo } = useSelector((state) => state.auth)
  const profile = userInfo?.avatar
    ? BASE_URL + '/' + userInfo.avatar
    : profileImg
  console.log(profile)

  return (
    <>
      <div style={{ height: '65px' }}></div>
      {open && <Sidebar open={open} setOpen={setOpen} />}
      <nav className="nav">
        <ul>
          <li className="logo">
            <IoMenu className="icon menuIcon" onClick={() => setOpen(!open)} />
            <p onClick={() => navigate('/')}>
              Style <span>Nexus</span>
            </p>
          </li>
          <div className="linkContainer">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'active navLink' : 'navLink'
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop_all"
                className={({ isActive }) =>
                  isActive ? 'active navLink' : 'navLink'
                }
              >
                Shop All
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? 'active navLink' : 'navLink'
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? 'active navLink' : 'navLink'
                }
              >
                Contact
              </NavLink>
            </li>
          </div>
          <div className="cartContainer">
            <>
              {userInfo ? (
                <div className="flexContainer">
                  <li>
                    <Link
                      to="/cart"
                      className={({ isActive }) =>
                        isActive ? 'active' : 'icon '
                      }
                    >
                      <IoBagOutline className="cart" />
                    </Link>
                  </li>
                  <Menu>
                    <MenuButton id="menuBtn">
                      <img src={profile} className="profile-img" />
                    </MenuButton>
                    <Dropdown />
                  </Menu>
                </div>
              ) : (
                <Link to="/login" className="login">
                  Sign in/Sign up
                </Link>
              )}
            </>
          </div>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
