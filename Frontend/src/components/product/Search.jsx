import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Search.css'
import { IoSearchOutline } from 'react-icons/io5'

const Search = ({ onClose }) => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/products/${keyword}`)
    } else {
      navigate('/products')
    }
  }

  useEffect(() => {
    // Clear keyword state when component is unmounted
    return () => setKeyword('')
  }, [])

  return (
    <form className="searchBox" onSubmit={handleSearchSubmit}>
      <input
        type="text"
        value={keyword}
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
