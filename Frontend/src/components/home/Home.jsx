import { Link } from 'react-router-dom'
import './Home.css'
import formal2 from '../../assets/products/formal4.jpg'
import Product from '../product/Product'
import ShopByCategory from './ShopByCategory'
import Metadata from '../Metadata.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { clearErrors } from '../../features/productSlice.jsx'
import { getProduct } from '../../actions/productActions.js'

const product = {
  name: "Arrow Men's Rayon Single Breasted Business Casual Blazer",
  images: [
    {
      url: 'https://m.media-amazon.com/images/I/61Wx4ujU5wL._SX569_.jpg',
    },
  ],
  price: 8500,
  _id: 'Formal_1',
}

const Home = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(getProduct())
    return () => {
      dispatch(clearErrors()) // Clear errors when component unmounts
    }
  }, [dispatch])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }
  return (
    <>
      <Metadata title="StreetStyleSprint"></Metadata>
      <div id="homeDiv">
        <section id="home">
          <div id="homeContainer">
            <h1>
              “Stay Stylish and Keep Sprinting Towards Your Fashion Goals With
              StreetStyleSprint!”
            </h1>
            <button type="button" className="btn">
              Buy Now
            </button>
          </div>
        </section>
      </div>
      <ShopByCategory />
      <section id="featured">
        <h2>FEATURED PRODUCTS</h2>
        <div>
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
        </div>
      </section>
    </>
  )
}

export default Home
