import './ProductsList.css'
import React, { useState } from 'react'
import { useCreateProductMutation } from '../../../redux/api/productSlice'
import { useGetCategoriesQuery } from '../../../redux/api/categoryApiSlice'
import { toast } from 'react-toastify'
import { LuUpload } from 'react-icons/lu'
import { FaPlus } from 'react-icons/fa6'
import { BeatLoader } from 'react-spinners'
import { useNavigate } from 'react-router'
import {
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Textarea,
  Button,
  ButtonGroup,
} from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'
import { countries } from '../../data/indiaData'
import Cookies from 'js-cookie'

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    brand: '',
    price: 0,
    description: '',
    quantity: 0,
    category: '',
    images: [],
    ItemWeight: 0,
    Packer: '',
    ManufacturerAddress: '',
    CountryOfOrigin: '',
    Manufacturer: '',
    DateFirstAvailable: '',
    ProductDimensions: '',
  })

  const navigate = useNavigate()
  const [createProduct, { isLoading }] = useCreateProductMutation()
  const { data: categories } = useGetCategoriesQuery()
  const handleChange = (e) => {
    const { name, value } = e.target
    setProductData({
      ...productData,
      [name]: value,
    })
  }
  const token = Cookies.get('jwt')
  console.log(productData)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)

    setProductData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }))
  }
  const handleCreate = async (e) => {
    e.preventDefault()
    console.log('Product Data:', productData)

    if (!productData || !productData.name) {
      console.error('Product data is incomplete or missing.')
      toast.error('Incomplete product data. Please fill all required fields.')
      return
    }

    const formData = new FormData()
    formData.append('name', productData.name)
    formData.append('brand', productData.brand)
    formData.append('price', productData.price)
    formData.append('description', productData.description)
    formData.append('quantity', productData.quantity)
    formData.append('category', productData.category)
    formData.append('CountryOfOrigin', productData.CountryOfOrigin)
    formData.append('DateFirstAvailable', productData.DateFirstAvailable)
    formData.append('ItemWeight', productData.ItemWeight)
    formData.append('Manufacturer', productData.Manufacturer)
    formData.append('ManufacturerAddress', productData.ManufacturerAddress)
    formData.append('Packer', productData.Packer)
    formData.append('ProductDimensions', productData.ProductDimensions)

    if (Array.isArray(productData.images)) {
      productData.images.forEach((image, index) => {
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
      const data = await createProduct(formData)
      console.log('Response Data:', data)

      if (data && data.error) {
        toast.error('Failed to create product. Try again.')
      } else {
        toast.success(`${productData.name} is created successfully`)
        navigate('/')
      }
    } catch (err) {
      console.error('Error during product creation:', err)
      toast.error('Product create failed. Try again.')
    }
  }
  return (
    <form className="productsList" onSubmit={handleCreate}>
      <div className="heading">
        <div>Create Product</div>
        <Button
          type="submit"
          colorScheme="green"
          isLoading={isLoading}
          spinner={<BeatLoader size={8} color="white" />}
          loadingText="Creating"
        >
          Create
        </Button>
      </div>
      <div className="flexContainer">
        <div className="one">
          <div className="flexContainer">
            <div className="ipContainer">
              <label htmlFor="name">Name:</label>
              <Input
                border={'1px'}
                name="name"
                value={productData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="ipContainer">
              <label htmlFor="brand">Brand:</label>
              <Input
                border={'1px'}
                name="brand"
                value={productData.brand}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="ipContainer">
            <label htmlFor="description">Product Description:</label>
            <Textarea
              name="description"
              value={productData.description}
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
                  value={productData.price}
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
                value={productData.quantity}
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
                value={productData.category}
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
                value={productData.CountryOfOrigin}
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
                value={productData.ItemWeight}
                onChange={handleChange}
                required
              />
            </div>
            <div className="ipContainer">
              <label htmlFor="ProductDimensions">Product Dimensions:</label>
              <Input
                border={'1px'}
                name="ProductDimensions"
                value={productData.ProductDimensions}
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
                value={productData.Packer}
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
                value={productData.DateFirstAvailable}
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
              value={productData.Manufacturer}
              onChange={handleChange}
              required
            />
          </div>
          <div className="ipContainer">
            <label htmlFor="ManufacturerAddress">Manufacturer Address:</label>
            <Input
              border={'1px'}
              name="ManufacturerAddress"
              value={productData.ManufacturerAddress}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="two">
          {productData?.images?.map((image, index) => {
            const imageUrl =
              image instanceof File ? URL.createObjectURL(image) : image
            return (
              <div key={index} className="imagePreview">
                <img
                  src={imageUrl}
                  alt={`Product Preview ${index + 1}`}
                  className="productImg img"
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

export default CreateProduct
