import React from 'react'
import '../home/Home.css'

import kid from '../../assets/Kids.png'
import men from '../../assets/Mens.png'
import women from '../../assets/Womens.png'
import formal from '../../assets/formal.png'

const ShopByCategory = () => {
  return (
    <section id="category">
      <h2>SHOP BY CATEGORY</h2>
      <div>
        <div className="categoryCard">
          <img src={kid} alt="Kids Section" />
          <p>Kids Wear</p>
        </div>
        <div className="categoryCard">
          <img src={men} alt="Men Section" />
          <p>Mens Wear</p>
        </div>
        <div className="categoryCard">
          <img src={women} alt="Women Section" />
          <p>Women Wear</p>
        </div>
        <div className="categoryCard">
          <img src={formal} alt="Women Section" />
          <p>Formal Wear</p>
        </div>
      </div>
    </section>
  )
}

export default ShopByCategory
