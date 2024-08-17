import React from 'react'
import { IoBagOutline } from 'react-icons/io5'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li className="logo">
          Style <span>Nexus</span>
        </li>
        <div className="linkContainer">
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/shop_all'}>Shop All</Link>
          </li>
          <li>
            <Link to={'/about'}>About</Link>
          </li>
          <li>
            <Link to={'/contact'}>Contact</Link>
          </li>
        </div>
        <div className="cartContainer">
          <li>
            <Link to={'/login'}>Log in</Link>
          </li>
          <li>
            <Link to={'/cart'} className="icon">
              <IoBagOutline />
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  )
}

export default Navbar
