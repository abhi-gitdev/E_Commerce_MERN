import React, { useEffect, useState } from 'react'
import './CategoryList.css'
import {
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
} from '../../../redux/api/categoryApiSlice'
import CategoryForm from './CategoryForm'
import { toast } from 'react-toastify'
import Modal from './Modal'
import { Button } from '@chakra-ui/react'

const CategoryList = () => {
  const [name, setName] = useState('')
  const { data: categories, refetch } = useGetCategoriesQuery()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [updateName, setUpdateName] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const [createCategory] = useCreateCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()

  const handleCreateCategory = async (e) => {
    e.preventDefault()
    if (!name) {
      toast.error('Category name is required')
      return
    }
    try {
      const result = await createCategory({ name }).unwrap()
      console.log(result)

      if (result.error) {
        toast.error(result.error)
      } else {
        setName('')
        toast.success(`${result.name} is created.`)
      }
    } catch (error) {
      console.log(error)
      toast.error('Creating category failed, try again!')
    }
  }

  const handleUpdateCategory = async (e) => {
    e.preventDefault()
    if (!updateName) {
      toast.error('Category name is required')
      return
    }
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updateName },
      }).unwrap()
      console.log(result)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(`${result.name} is updated.`)
        setSelectedCategory(null)
        setUpdateName('')
        setModalVisible(false)
      }
    } catch (error) {
      console.log(error)
      toast.error('Error updating the category name, try again!')
    }
  }

  const handleDelete = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap()
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(`${result.name} is deleted successfully!`)
        setModalVisible(false)
        setSelectedCategory(null)
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to delete category, try again!')
    }
  }
  useEffect(() => {
    if (!modalVisible) {
      refetch()
    }
  }, [modalVisible, refetch, name])

  return (
    <div className="categories">
      {/* <AdminMenu/> */}
      <div className="manageCategory">Manage Category</div>
      <CategoryForm
        value={name}
        setValue={setName}
        handleSubmit={handleCreateCategory}
      />
      <br />
      <hr />
      <div className="categoriesList">
        {categories?.map((category) => (
          <div key={category._id}>
            <Button
              onClick={() => {
                {
                  setModalVisible(true)
                  setSelectedCategory(category)
                  setUpdateName(category.name)
                }
              }}
              variant={'outline'}
            >
              {category.name}
            </Button>
          </div>
        ))}
      </div>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <CategoryForm
          value={updateName}
          setValue={setUpdateName}
          handleSubmit={handleUpdateCategory}
          buttonText="Update"
          handleDelete={handleDelete}
        ></CategoryForm>
      </Modal>
    </div>
  )
}

export default CategoryList
