import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getProductDetails } from '../../actions/productActions'
import { clearErrors } from '../../features/productSlice'
import './ProductDetails.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Carousel from 'react-material-ui-carousel'
const ProductDetails = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { error, loading, product } = useSelector(
    (state) => state.productDetails
  )
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
    dispatch(getProductDetails(params.id))
    return () => {
      dispatch(clearErrors())
    }
  }, [dispatch, error, params.id])

  const [slide, setSlide] = useState(0)
  const nextSlide = () => {
    setSlide(slide === product.images.length - 1 ? 0 : slide + 1)
  }
  const previousSlide = () => {
    setSlide(slide === 0 ? product.images.length - 1 : slide - 1)
  }
  return (
    <>
      <div className="productDetails">
        <div className="imageDiv">
          {/* <Carousel> */}
          <FaArrowLeft className="left-arrow" onClick={previousSlide} />
          {product.images &&
            product.images.map((item, id) => (
              <img
                src={item.url}
                key={id}
                alt={product.name}
                className={slide === id ? 'slide' : 'slide slide-hidden'}
              />
            ))}
          <FaArrowRight className="right-arrow" onClick={nextSlide} />
          {/* </Carousel> */}
        </div>
        <div>kjkj</div>
      </div>
    </>
  )
}

export default ProductDetails
