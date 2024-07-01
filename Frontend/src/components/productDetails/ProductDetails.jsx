import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getProductDetails } from '../../actions/productActions'
import { clearErrors } from '../../features/productSlice'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import './ProductDetails.css'

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

  return (
    <div className="imageDiv">
      <Carousel showThumbs={true}>
        {product.images &&
          product.images.map((item, id) => (
            <div>
              <img
                src={item.url}
                key={item.url}
                alt={product.name}
                className="carouselImage"
              />
            </div>
          ))}
      </Carousel>
    </div>
  )
}

export default ProductDetails
