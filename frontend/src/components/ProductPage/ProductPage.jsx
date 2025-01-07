import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import './ProductPage.css'
import { Link } from 'react-router-dom'
import { Rating } from '@mui/lab'
import {
  useCreateReviewMutation,
  useGetProductByIdQuery,
} from '../../redux/api/productSlice'
import { Button, Spinner } from '@chakra-ui/react'
import { BASE_URL } from '../../redux/constants'
import { Input, Stack, Textarea } from '@chakra-ui/react'
import { useGetCategoriesQuery } from '../../redux/api/categoryApiSlice'
import profileImg from './../../assets/profile.png'
import ReviewCard from '../common/ReviewCard/ReviewCard'
const ProductPage = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const profile = userInfo?.avatar
    ? BASE_URL + '/' + userInfo.avatar
    : profileImg
  const params = useParams()
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const [review, setReview] = useState({
    rating: 0,
    comment: '',
  })
  const {
    data: product,
    refetch: getProductRefetch,
    isLoading,
    isError,
  } = useGetProductByIdQuery(params.id)
  const [createReview] = useCreateReviewMutation()
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
  const options2 = {
    value: 0,
    precision: 0.5,
  }
  const handleReviewSubmit = async () => {
    if (!review.rating || !review.comment) {
      toast.error('Please provide a rating and comment.')
      return
    }

    try {
      const payload = { ...review, productId: product._id }
      await createReview(payload).unwrap()
      toast.success('Review added successfully.')
      setReview({ rating: 0, comment: '' }) // Reset review state
      getProductRefetch() // Refetch product details to include the new review
    } catch (error) {
      toast.error(
        error?.data?.message || 'Failed to add review. Please try again.'
      )
    }
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
                    onClick={() => setSlide(id)}
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
                <span>({product.numReviews || 0} Reviews)</span>
              </div>
              <hr />

              <p className="price">MRP: ₹{product.price}</p>
              <div className="buyBox">
                <div className="qtyDiv">
                  <p>Quantity:</p>
                  <button
                    className="qtBtn"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    -
                  </button>
                  <input type="number" value={quantity} />
                  <button
                    className="qtBtn"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button type="button" className="buyBtn">
                  Add to Cart
                </button>
              </div>
              <p className="status">
                Status:{' '}
                <b className={product.quantity < 1 ? 'redColor' : 'greenColor'}>
                  {product.countInStock < 1 ? 'Out Of Stock' : 'In Stock'} (
                  {product.countInStock})
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
            <div className="addReview">
              <div>
                <img src={profile} className="profile-img" />
                <Textarea
                  placeholder="Enter your comment..."
                  variant="flushed"
                  value={review.comment}
                  onChange={(e) =>
                    setReview({ ...review, comment: e.target.value })
                  }
                  required
                  className="comment"
                />
              </div>
              <div className="rateBtnDiv">
                <Rating
                  size="large"
                  precision={0.5}
                  value={review.rating}
                  onChange={(event, newValue) =>
                    setReview({ ...review, rating: newValue })
                  }
                />
                <Button
                  variant="outline"
                  className="addReviewBtn"
                  onClick={handleReviewSubmit}
                >
                  Add Review
                </Button>
              </div>
            </div>
            <div className="reviewsContainer">
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
        </div>
      </section>
    </>
  )
}

export default ProductPage
