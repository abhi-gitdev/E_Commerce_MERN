import React from 'react'
import { GrLanguage } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
import './Sidebar.css'

const Sidebar = ({ open, setOpen }) => {
  const userInfo = localStorage.getItem('userInfo')
  console.log(userInfo)

  return (
    <div className="sideBar">
      <button onClick={() => setOpen(!open)} className="cross">
        <RxCross2 />
      </button>
      <ul>
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

        {!userInfo && (
          <li>
            <Link to="/login" className="login">
              Sign in/Sign up
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Sidebar
