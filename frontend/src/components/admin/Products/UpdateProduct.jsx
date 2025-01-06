import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
} from '../../../redux/api/productSlice'
import { MdDelete } from 'react-icons/md'
import { useGetCategoriesQuery } from '../../../redux/api/categoryApiSlice'
import {
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Textarea,
  Button,
  ButtonGroup,
} from '@chakra-ui/react'
import { BeatLoader } from 'react-spinners'
import { countries, indianCities } from '../../data/indiaData'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import { LuUpload } from 'react-icons/lu'
import { BASE_URL } from '../../../redux/constants'
import './ProductsList.css'

const UpdateProduct = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { data: productData, refetch: getProductRefetch } =
    useGetProductByIdQuery(params.id)
  const { refetch } = useGetProductsQuery()
  const [pData, setPData] = useState({
    name: productData?.name || '',
    brand: productData?.brand || '',
    price: productData?.price || 0,
    description: productData?.description || '',
    quantity: productData?.quantity || 0,
    countInStock: productData?.countInStock || 0,
    category: productData?.category || '',
    images: productData?.images || [],
    ItemWeight: productData?.ItemWeight || 0,
    Packer: productData?.Packer || '',
    ManufacturerAddress: productData?.ManufacturerAddress || '',
    CountryOfOrigin: productData?.CountryOfOrigin || '',
    Manufacturer: productData?.Manufacturer || '',
    DateFirstAvailable: productData?.DateFirstAvailable
      ? new Date(productData?.DateFirstAvailable).toISOString().split('T')[0]
      : '',
    ProductDimensions: productData?.ProductDimensions || '',
    imagesToDelete: [],
  })
  console.log(productData)
  const { data: categories = [] } = useGetCategoriesQuery()
  const [updateProduct] = useUpdateProductMutation()
  const [deleteProduct] = useDeleteProductMutation()
  useEffect(() => {
    if (productData && productData._id) {
      setPData({
        name: productData?.name,
        brand: productData?.brand,
        price: productData?.price,
        description: productData?.description,
        quantity: productData?.quantity,
        countInStock: productData?.countInStock,
        category: productData?.category,
        images: productData?.images,
        ItemWeight: productData?.ItemWeight,
        Packer: productData?.Packer,
        ManufacturerAddress: productData?.ManufacturerAddress,
        CountryOfOrigin: productData?.CountryOfOrigin,
        Manufacturer: productData?.Manufacturer,
        DateFirstAvailable: productData?.DateFirstAvailable
          ? new Date(productData?.DateFirstAvailable)
              .toISOString()
              .split('T')[0]
          : '',
        ProductDimensions: productData?.ProductDimensions,
      })
    }
  }, [productData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setPData({
      ...pData,
      [name]: value,
    })
  }
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)

    setPData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!pData || !pData.name) {
      console.error('Product data is incomplete or missing.')
      toast.error('Incomplete product data. Please fill all required fields.')
      return
    }

    const formData = new FormData()
    formData.append('name', pData.name)
    formData.append('brand', pData.brand)
    formData.append('price', pData.price)
    formData.append('description', pData.description)
    formData.append('quantity', pData.quantity)
    formData.append('countInStock', pData.countInStock)
    formData.append('category', pData.category)
    formData.append('CountryOfOrigin', pData.CountryOfOrigin)
    formData.append('DateFirstAvailable', pData.DateFirstAvailable)
    formData.append('ItemWeight', pData.ItemWeight)
    formData.append('Manufacturer', pData.Manufacturer)
    formData.append('ManufacturerAddress', pData.ManufacturerAddress)
    formData.append('Packer', pData.Packer)
    formData.append('ProductDimensions', pData.ProductDimensions)
    formData.append('imagesToDelete', pData.imagesToDelete)

    if (Array.isArray(pData.images)) {
      pData.images.forEach((image, index) => {
        if (image instanceof File) {
          formData.append('images', image)
        } else {
          console.warn(
            `Image at index ${index} is not a valid File object`,
            image
          )
        }
      })
    } else {
      console.error('productData.images is not an array or is missing.')
    }

    try {
      const data = await updateProduct({
        data: formData,
        productId: params.id,
      })
      console.log('Response Data:', data)

      if (data && data.error) {
        toast.error('Failed to create product. Try again.')
      } else {
        toast.success(`${pData.name} is updated successfully`)
      }
    } catch (err) {
      console.error('Error during product updation:', err)
      toast.error('Product update failed. Try again.')
    }
    navigate(-1)
    getProductRefetch()
    refetch()
  }
  const handleDelete = async () => {
    try {
      let confirmation = window.confirm(
        'Are you sure you want to delete this product?'
      )
      if (!confirmation) return
      const { data } = await deleteProduct(params.id)
      toast.success(`${data.name} is deleted successfully.`)
      navigate(-1)
    } catch (error) {
      console.error('Error during product deletion:', error)
      toast.error('Product deletion failed. Try again.')
    }
  }
  return (
    <form className="productsList" onSubmit={handleSubmit}>
      <div className="heading">
        <h3 className="h3">Update Product</h3>
        <div>
          <Button
            type="submit"
            colorScheme="red"
            spinner={<BeatLoader size={8} color="white" />}
            onClick={handleDelete}
            loadingText="Deleting"
          >
            Delete
          </Button>
          <Button
            type="submit"
            colorScheme="green"
            spinner={<BeatLoader size={8} color="white" />}
            loadingText="Creating"
          >
            Update
          </Button>
        </div>
      </div>
      <div className="flexContainer">
        <div className="one">
          <div className="flexContainer">
            <div className="ipContainer">
              <label htmlFor="name">Name:</label>
              <Input
                border={'1px'}
                name="name"
                value={pData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="ipContainer">
              <label htmlFor="brand">Brand:</label>
              <Input
                border={'1px'}
                name="brand"
                value={pData.brand}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="ipContainer">
            <label htmlFor="description">Product Description:</label>
            <Textarea
              name="description"
              value={pData.description}
              onChange={handleChange}
              border={'1px'}
              borderRadius={'5px'}
              fontSize={'15px'}
              resize="vertical"
              size="sm"
              required
            />
          </div>
          <div className="flexContainer">
            <div className="ipContainer">
              <label htmlFor="price">Price:</label>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.500"
                  fontSize="1.2em"
                >
                  ₹
                </InputLeftElement>
                <Input
                  type="number"
                  border={'1px'}
                  name="price"
                  value={pData.price}
                  onChange={handleChange}
                />
              </InputGroup>
            </div>
            <div className="ipContainer">
              <label htmlFor="quantity">Quantity:</label>
              <Input
                type="number"
                border={'1px'}
                name="quantity"
                value={pData.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="ipContainer">
              <label htmlFor="countInStock">Count in Stock:</label>
              <Input
                type="Number"
                border={'1px'}
                name="countInStock"
                value={pData.countInStock}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flexContainer">
            <div className="ipContainer">
              <label htmlFor="category">Category:</label>
              <Select
                placeholder="Select Category"
                border={'1px'}
                name="category"
                value={pData.category}
                onChange={handleChange}
                required
              >
                {categories?.map((category) => (
                  <option key={uuidv4()} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="ipContainer">
              <label htmlFor="CountryOfOrigin">Country of Origin:</label>
              <Select
                placeholder="Select Country of Origin"
                border={'1px'}
                name="CountryOfOrigin"
                value={pData.CountryOfOrigin}
                onChange={handleChange}
                required
              >
                {countries?.map((country) => (
                  <option key={uuidv4()} value={country}>
                    {country}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="flexContainer">
            <div className="ipContainer">
              <label htmlFor="ItemWeight">Item Weight (g):</label>
              <Input
                type="number"
                border={'1px'}
                name="ItemWeight"
                value={pData.ItemWeight}
                onChange={handleChange}
                required
              />
            </div>
            <div className="ipContainer">
              <label htmlFor="ProductDimensions">Product Dimensions:</label>
              <Input
                border={'1px'}
                name="ProductDimensions"
                value={pData.ProductDimensions}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flexContainer">
            <div className="ipContainer">
              <label htmlFor="Packer">Packer:</label>
              <Input
                border={'1px'}
                name="Packer"
                value={pData.Packer}
                onChange={handleChange}
                required
              />
            </div>
            <div className="ipContainer">
              <label htmlFor="DateFirstAvailable">
                Select Date First Available:
              </label>
              <Input
                size="md"
                name="DateFirstAvailable"
                value={pData.DateFirstAvailable}
                onChange={handleChange}
                type="date"
                border={'1px'}
                required
              />
            </div>
          </div>
          <div className="ipContainer">
            <label htmlFor="Manufacturer">Manufacturer:</label>
            <Input
              border={'1px'}
              name="Manufacturer"
              value={pData.Manufacturer}
              onChange={handleChange}
              required
            />
          </div>
          <div className="ipContainer">
            <label htmlFor="ManufacturerAddress">Manufacturer Address:</label>
            <Input
              border={'1px'}
              name="ManufacturerAddress"
              value={pData.ManufacturerAddress}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="two">
          {pData?.images?.map((image, index) => {
            console.log(image)
            const imageUrl =
              image instanceof File ? URL.createObjectURL(image) : image
            return (
              <div className="pImages2">
                <MdDelete
                  className="icon"
                  onClick={() =>
                    setPData({
                      ...pData,
                      images: [...pData.images.filter((img) => img !== image)],
                      imagesToDelete: [...(pData.imagesToDelete || []), image],
                    })
                  }
                />
                <img
                  src={
                    productData.images.includes(image)
                      ? `${BASE_URL}/product/${image}`
                      : imageUrl
                  }
                  alt=""
                  className="productImg"
                />
              </div>
            )
          })}
          <div className="subTwo">
            <label htmlFor="file-upload" className="upload">
              <div className="uploadContainer">
                <LuUpload className="plus" />
                Upload Product Images
              </div>
              <input
                type="file"
                id="file-upload"
                className="image"
                style={{ display: 'none' }}
                multiple
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
      </div>
    </form>
  )
}

export default UpdateProduct
