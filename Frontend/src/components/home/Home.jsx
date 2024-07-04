import { Link } from 'react-router-dom'
import './Home.css'
import Product from '../product/Product'
import ShopByCategory from './ShopByCategory'
import Metadata from '../Metadata.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { clearErrors } from '../../features/productSlice.jsx'
import { getProduct } from '../../actions/productActions.js'
import Loader from '../loader/Loader.jsx'
import { toast } from 'react-toastify'

const Home = () => {
  const dispatch = useDispatch()
  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products)

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
    dispatch(getProduct())

    return () => {
      dispatch(clearErrors())
    }
  }, [dispatch, error])

  if (loading) {
    return <Loader />
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
          {products &&
            products.map((p) => <Product key={p._id} product={p}></Product>)}
        </div>
      </section>
    </>
  )
}

export default Home
