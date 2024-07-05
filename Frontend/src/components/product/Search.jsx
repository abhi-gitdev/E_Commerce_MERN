import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Search.css'
import { IoSearchOutline } from 'react-icons/io5'

const Search = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/products/${keyword}`)
    } else {
      navigate('/catalog')
    }
  }
  return (
    <form className="searchBox" onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Search here..."
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit" className="searchSbmt">
        <IoSearchOutline className="searchSbmtIcon" />
      </button>
    </form>
  )
}

export default Search
