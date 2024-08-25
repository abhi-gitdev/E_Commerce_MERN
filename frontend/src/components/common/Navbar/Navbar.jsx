import React, { useState } from 'react'
import { IoBagOutline } from 'react-icons/io5'
import { Link, NavLink, useNavigate } from 'react-router-dom' // Use NavLink instead of Link
import { useDispatch, useSelector } from 'react-redux'
import profile from '../../../assets/profile.png'
import './Navbar.css'
import Dropdown from '../dropdown/Dropdown'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <>
      <nav>
        <ul>
          <li className="logo">
            Style <span>Nexus</span>
          </li>
          <div className="linkContainer">
            <li>
              <NavLink exact to={'/'} activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={'/shop_all'} activeClassName="active">
                Shop All
              </NavLink>
            </li>
            <li>
              <NavLink to={'/about'} activeClassName="active">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to={'/contact'} activeClassName="active">
                Contact
              </NavLink>
            </li>
          </div>
          <div className="cartContainer">
            <li
              style={{
                width: '150px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {userInfo ? (
                <>
                  <img
                    src={profile}
                    alt={userInfo.firstName}
                    className="profile-img"
                    onClick={() => setToggleDropdown(!toggleDropdown)}
                  />
                </>
              ) : (
                <Link to={'/login'} className="login">
                  Sign in/Sign up
                </Link>
              )}
            </li>
            <li>
              <NavLink to={'/cart'} className="icon" activeClassName="active">
                <IoBagOutline />
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>
      {userInfo && toggleDropdown && <Dropdown />}
    </>
  )
}

export default Navbar
