import './ProductsCard.css'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Rating } from '@mui/lab'
import { BASE_URL } from '../../../redux/constants'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useDeleteProductMutation } from '../../../redux/api/productSlice'
import HeartIcon from './HeartIcon'

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
        <div className="actions">
          <HeartIcon product={product} className="icon"></HeartIcon>
          {userInfo?.role == 'admin' && (
            <>
              <MdDelete className="icon" onClick={handleDelete} />
              <MdEdit
                className="icon"
                onClick={() => navigate(`/admin/updateProduct/${product._id}`)}
              />
            </>
          )}
        </div>
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
          <p style={{ margin: '0', fontWeight: '550' }}>{product.brand}</p>
          <p style={{ margin: '0', fontSize: '15px' }}>{product.name}</p>
          {/* <p className="description">
          {product?.description?.substring(0, 60)}...
          </p> */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Rating {...options} /> <span>({product?.numReviews || 0})</span>
          </div>
          <span>
            ₹
            <span style={{ fontSize: '22px', fontWeight: '400' }}>
              {product.price}
            </span>
          </span>
        </div>
      </div>
    </>
  )
}

export default ProductsCard
