import React from 'react'
import SimpleImageSlider from 'react-simple-image-slider'
import img1 from './../../assets/wallpaper1.png'
import img2 from './../../assets/wallpaper2.png'
import img3 from './../../assets/wallpaper3.png'
import { useGetCategoriesQuery } from '../../redux/api/categoryApiSlice'
import GetTopProducts from './GetTopProducts'
import './Home.css'
import NewProducts from './NewProducts'
import { BASE_URL } from '../../redux/constants'
import { Link } from 'react-router-dom'

const Home = () => {
  const images = [{ url: img1 }, { url: img2 }, { url: img3 }]
  const { data: categories, error, isLoading } = useGetCategoriesQuery()
  console.log(categories)

  return (
    <section className="home">
      <div className="header">
        <SimpleImageSlider
          bgColor="white"
          width="91%"
          height={400}
          images={images}
          showNavs={true}
          autoPlay
          autoPlayDelay={4}
        />
        <div className="categoryCardDiv">
          <h1 className="homeHead">Shop by Category</h1>
          <div>
            {categories?.map((category) => {
              return (
                <Link to={`/category/${category._id}`} className="categoryCard">
                  <img
                    src={`${BASE_URL}/${category?.image}`}
                    alt={category.name}
                    className="productImg categoryImg"
                  />
                  <p>{category.name}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      <GetTopProducts />
      <NewProducts />
    </section>
  )
}

export default Home
