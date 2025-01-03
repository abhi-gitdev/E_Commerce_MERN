import React from 'react'
import SimpleImageSlider from 'react-simple-image-slider'
import img1 from './../../assets/wallpaper1.png'
import img2 from './../../assets/wallpaper2.png'
import img3 from './../../assets/wallpaper3.png'
import { useGetCategoriesQuery } from '../../redux/api/categoryApiSlice'
import './Home.css'

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
        <div className="categories">
          {categories?.map((category) => {
            return category.name
          })}
        </div>
      </div>
    </section>
  )
}

export default Home
