import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosCart } from 'react-icons/io'
import { CgProfile } from 'react-icons/cg'
import { IoSearchOutline } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'
import logo from '../../assets/logo.png'
import './Navbar.css'
import Search from '../product/Search'

const Navbar = () => {
  const [searchVisible, setSearchVisible] = useState(false)

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev)
  }

  return (
    <>
      <nav>
        <Link to={'/'} className="link">
          <img
            src={logo}
            style={{
              position: 'absolute',
              left: '4rem',
              top: '0rem',
              height: '5rem',
            }}
            alt="Logo"
          />
          StreetStyleSprint
        </Link>
        <div className="navDiv" id="pageLink">
          <Link to={'/'} className="link">
            Home
          </Link>
          <Link to={'/products'} className="link">
            Catalog
          </Link>
          <Link to={'/'} className="link">
            About
          </Link>
        </div>
        <div className="navDiv">
          <button type="button" className="searchBtn" onClick={toggleSearch}>
            {searchVisible ? (
              <RxCross2 className="searchIcon" />
            ) : (
              <IoSearchOutline className="searchIcon" />
            )}
          </button>
          <Link to={'/'} className="link">
            <IoIosCart style={{ fontSize: '2rem' }} />
          </Link>
          <Link to={'/'} className="link">
            <CgProfile style={{ fontSize: '2rem' }} />
          </Link>
        </div>
      </nav>
      <div className={`searchBar ${searchVisible ? 'visible' : ''}`}>
        {searchVisible && <Search />}
      </div>
    </>
  )
}

export default Navbar
