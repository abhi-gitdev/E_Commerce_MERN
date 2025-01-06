import './ProductsCard.css'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Rating } from '@mui/lab'
import { BASE_URL } from '../../../redux/constants'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useDeleteProductMutation } from '../../../redux/api/productSlice'

const ProductsCard = ({ product, refetch }) => {
  const [deleteProduct] = useDeleteProductMutation()
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  console.log(product)
  const options = {
    value: product?.rating,
    readOnly: true,
    precision: 0.5,
  }
  const handleDelete = async () => {
    try {
      let confirmation = window.confirm(
        'Are you sure you want to delete this product?'
      )
      if (!confirmation) return
      const { data } = await deleteProduct(product._id)
      toast.success(`${product.name} is deleted successfully.`)
    } catch (error) {
      console.error('Error during product deletion:', error)
      toast.error('Product deletion failed. Try again.')
    }
    refetch()
  }
  return (
    <>
      <div className="productCard">
        {userInfo.role == 'admin' && (
          <div className="actions">
            <MdDelete className="icon" onClick={handleDelete} />
            <MdEdit
              className="icon"
              onClick={() => navigate(`/admin/updateProduct/${product._id}`)}
            />
          </div>
        )}
        <img
          src={`${BASE_URL}/product/${product?.images[0]}`}
          alt={product.name}
          className="productImg"
          onClick={() => navigate(`/product/${product._id}`)}
        />
        <div
          className="details"
          onClick={() => navigate(`/product/${product._id}`)}
        >
          <p>{product.name}</p>
          {/* <p className="description">
          {product?.description?.substring(0, 60)}...
          </p> */}
          <div>
            <Rating {...options} />{' '}
            <span>({product?.numOfReviews || 0} Reviews)</span>
          </div>
          <span>₹{product.price}</span>
        </div>
      </div>
    </>
  )
}

export default ProductsCard
