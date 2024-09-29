import React, { useState } from 'react'
import { useCreateProductMutation } from '../../../redux/api/productSlice'
import { useGetCategoriesQuery } from '../../../redux/api/categoryApiSlice'
import { toast } from 'react-toastify'
import { LuUpload } from 'react-icons/lu'
import { FaPlus } from 'react-icons/fa6'
import { BeatLoader } from 'react-spinners'
import './ProductsList.css'
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

const ProductsList = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: 0,
    description: '',
    quantity: 0,
    category: '',
    images: [],
    countInStock: 0,
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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    const imagePaths = files.map((file) => URL.createObjectURL(file))

    setProductData((prev) => ({
      ...prev,
      images: [...prev.images, ...imagePaths],
    }))
  }
  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', productData.name)
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
      formData.append('countInStock', productData.countInStock)
      formData.append('images', productData.images)
      console.log(formData)
      const { data } = await createProduct(formData)
      console.log({ data: data })
      if (data.error) {
        toast.error('Failed to create product. Try again.')
      } else {
        toast.success(`${data.name} is created successfully`)
        navigate('/')
      }
    } catch (err) {
      console.log(err)
      toast.error('Product create failed. Try again.')
    }
  }
  return (
    <form className="productsList">
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
            <Select
              placeholder="Select Category"
              border={'1px'}
              name="category"
              value={productData.category}
              onChange={handleChange}
              required
            >
              {categories?.map((category) => (
                <option key={uuidv4()} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Select>
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
                type="datetime-local"
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
          {productData?.images?.map((image, index) => (
            <div key={index} className="imagePreview">
              <img
                src={image}
                alt={`Product Preview ${index + 1}`}
                className="img"
              />
            </div>
          ))}
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

export default ProductsList
