import React from 'react'
import { GrLanguage } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
import './Sidebar.css'
import { useGetCategoriesQuery } from '../../../../redux/api/categoryApiSlice'

const Sidebar = ({ open, setOpen }) => {
  const userInfo = localStorage.getItem('userInfo')
  console.log(userInfo)
  const { data: categories, isLoading, isError } = useGetCategoriesQuery()
  let men
  let women
  let kids
  if (!isLoading) {
    men = categories.filter((category) => category.name == 'Men')[0]._id
    women = categories.filter((category) => category.name == 'Women')[0]._id
    kids = categories.filter((category) => category.name == 'Kids')[0]._id
  }
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
          <Link to={'/catalog'}>Catalog</Link>
        </li>
        <li>
          <Link to={`/category/${men}`}>Men</Link>
        </li>
        <li>
          <Link to={`/category/${women}`}>Women</Link>
        </li>
        <li>
          <Link to={`/category/${kids}`}>Kids</Link>
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
