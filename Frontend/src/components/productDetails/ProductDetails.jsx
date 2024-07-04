import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getProductDetails } from '../../actions/productActions'
import { clearErrors } from '../../features/productSlice'
import './ProductDetails.css'
import { Link } from 'react-router-dom'
import Loader from '../loader/Loader'
import { Rating } from '@mui/lab'
import ReviewCard from './ReviewCard'

const ProductDetails = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { error, loading, product } = useSelector(
    (state) => state.productDetails
  )

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProductDetails(params.id))
  }, [dispatch, error, params.id])
  const options = {
    size: 'large',
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  }
  const [slide, setSlide] = useState(0)

  if (error) {
    toast.error(error)
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="productPage">
          <div className="path">
            <Link to="/">Home</Link>
            <span> / </span>
            <Link to="/catalog">Catalog</Link>
            <span> / </span>
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </div>
          <div className="productDetails">
            <div className="productImg">
              <div className="thumb">
                {product.images &&
                  product.images.map((item, id) => (
                    <img
                      src={item.url}
                      key={id}
                      alt={product.name}
                      onClick={() => setSlide(id)}
                    />
                  ))}
              </div>
              <div className="imageDiv">
                {product.images &&
                  product.images.map((item, id) => (
                    <img
                      src={item.url}
                      key={id}
                      alt={product.name}
                      className={slide === id ? 'slide' : 'slide slide-hidden'}
                    />
                  ))}
              </div>
            </div>
            <div className="content">
              <div className="info">
                <h3 className="pName">{product.name}</h3>
                <div
                  style={{
                    display: 'flex',
                    fontSize: '1vmax',
                    alignItems: 'center',
                  }}
                >
                  <Rating {...options} />
                  <span>({product.numOfReviews} Reviews)</span>
                </div>
                <hr />

                <p className="price">MRP: ₹{product.price}</p>
                <div className="buyBox">
                  <div className="qtyDiv">
                    <p>Quantity:</p>
                    <button className="qtBtn">-</button>
                    <input type="number" value="1" />
                    <button className="qtBtn">+</button>
                  </div>
                  <button type="button" className="buyBtn">
                    Add to Cart
                  </button>
                </div>
                <p className="status">
                  Status:{' '}
                  <b
                    className={product.quantity < 1 ? 'redColor' : 'greenColor'}
                  >
                    {product.quantity < 1 ? 'Out Of Stock' : 'In Stock'}
                  </b>
                </p>
                <p className="pDetailsH">Product Details</p>
                <p>
                  <span className="PDhead">Product Dimensions (LxWxH): </span>
                  {product.productDetail?.ProductDimensions}
                </p>

                <p>
                  <span className="PDhead">Item Weight: </span>
                  {product.productDetail?.ItemWeight}
                </p>
                <p>
                  <span className="PDhead">Department: </span>
                  {product.productDetail?.Department}
                </p>
                <p>
                  {' '}
                  <span className="PDhead">Manufacturer: </span>
                  {product.productDetail?.Manufacturer}
                </p>
                <p>
                  <span className="PDhead">Manufacturer Address: </span>
                  {product.productDetail?.ManufacturerAddress}
                </p>
                <p>
                  <span className="PDhead">Country of Origin: </span>
                  {product.productDetail?.CountryOfOrigin}
                </p>
                <p>
                  <span className="PDhead">Packer: </span>
                  {product.productDetail?.Packer}
                </p>
                <p>
                  <span className="PDhead">Generic Name: </span>
                  {product.productDetail?.GenericName}
                </p>
              </div>
            </div>
          </div>
          <div className="description">
            <h3>Product Description</h3>
            <p>{product.description}</p>
          </div>
          <div className="revDiv">
            <h3>Reviews</h3>
            <div className="reviews">
              {product.reviews && product.reviews[0] ? (
                <div className="review">
                  {product.reviews.map((review) => (
                    <ReviewCard review={review} />
                  ))}
                </div>
              ) : (
                <p>No Reviews Yet</p>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default ProductDetails
