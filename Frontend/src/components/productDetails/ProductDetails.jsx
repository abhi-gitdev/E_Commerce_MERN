import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getProductDetails } from '../../actions/productActions'
import { clearErrors } from '../../features/productSlice'
import './ProductDetails.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Carousel from 'react-material-ui-carousel'
import { Link } from 'react-router-dom'
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

  // console.log(product)
  const [slide, setSlide] = useState(0)
  return (
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
            <h3>{product.name}</h3>
            <hr />
            <p>₹{product.price}</p>
            <p>Product Details</p>
            <p>
              Product Dimensions (LxWxH ):
              {product.productDetail.ProductDimensions}
            </p>
            <p>Item Weight: {product.productDetail.ItemWeight}</p>
            <p>Department: {product.productDetail.Department}</p>
            <p>Manufacturer: {product.productDetail.Manufacturer}</p>
            <p>
              Manufacturer Address: {product.productDetail.ManufacturerAddress}
            </p>
            <p>Country of Origin: {product.productDetail.CountryOfOrigin}</p>

            <p>Packer: {product.productDetail.Packer}</p>
            <p>Generic Name: {product.productDetail.GenericName}</p>
          </div>
          <div className="buyBox">
            <p>₹{product.price}</p>
            <button type="button">Buy Now</button>
            <button type="button">Add to Cart</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
