import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import './ProductPage.css'
import { Link } from 'react-router-dom'
import { Rating } from '@mui/lab'
import { useGetProductByIdQuery } from '../../redux/api/productSlice'
import { Spinner } from '@chakra-ui/react'
import { BASE_URL } from '../../redux/constants'
import { useGetCategoriesQuery } from '../../redux/api/categoryApiSlice'

const ProductPage = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const {
    data: product,
    refetch: getProductRefetch,
    isLoading,
    isError,
  } = useGetProductByIdQuery(params.id)
  const { data: categories } = useGetCategoriesQuery()
  const [slide, setSlide] = useState(0)
  if (isLoading) {
    return <Spinner size={'xl'} />
  }
  if (isError) {
    return <div className="error">Error loading products.</div>
  }
  const options = {
    value: product?.rating,
    readOnly: true,
    precision: 0.5,
  }
  console.log(product)
  return (
    <>
      <section className="productPage">
        <div className="path">
          <Link to="/">Home</Link>
          <span> / </span>
          <Link to="/catalog">Catalog</Link>
          <span> / </span>
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </div>
        <div className="productDetails">
          <div className="productImg2">
            <div className="thumb">
              {product.images &&
                product.images.map((item, id) => (
                  <img
                    src={`${BASE_URL}/product/${item}`}
                    alt={product.name}
                    className="productImg2"
                    onClick={() => navigate(`/product/${product._id}`)}
                  />
                ))}
            </div>
            <div className="imageDiv">
              {product.images &&
                product.images.map((item, id) => (
                  <img
                    src={`${BASE_URL}/product/${item}`}
                    alt={product.name}
                    className={slide === id ? 'slide' : 'slide slide-hidden'}
                    key={id}
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
                <b className={product.quantity < 1 ? 'redColor' : 'greenColor'}>
                  {product.quantity < 1 ? 'Out Of Stock' : 'In Stock'}
                </b>
              </p>
              <p className="pDetailsH">Product Details</p>
              <p>
                <span className="PDhead">Product Dimensions (LxWxH): </span>
                {product?.ProductDimensions}
              </p>

              <p>
                <span className="PDhead">Item Weight: </span>
                {product?.ItemWeight}
              </p>
              <p>
                <span className="PDhead">Category: </span>

                {categories.map((category) =>
                  category._id == product?.category ? category.name : ''
                )}
              </p>
              <p>
                {' '}
                <span className="PDhead">Manufacturer: </span>
                {product?.Manufacturer}
              </p>
              <p>
                <span className="PDhead">Manufacturer Address: </span>
                {product?.ManufacturerAddress}
              </p>
              <p>
                <span className="PDhead">Country of Origin: </span>
                {product?.CountryOfOrigin}
              </p>
              <p>
                <span className="PDhead">Packer: </span>
                {product?.Packer}
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
    </>
  )
}

export default ProductPage
