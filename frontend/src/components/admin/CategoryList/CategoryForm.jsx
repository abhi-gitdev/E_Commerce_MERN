import React from 'react'
import { Input, Button } from '@chakra-ui/react'

const CategoryForm = ({
  value,
  setValue,
  image,
  setImage,
  handleSubmit,
  buttonText = 'Create',
  handleDelete,
}) => {
  return (
    <div style={{ width: '100%' }}>
      <form action="" className="categoryForm" onSubmit={handleSubmit}>
        <Input
          placeholder="Write category name..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <label htmlFor="image" style={{ fontWeight: 'bold' }}>
          Upload Category Image:{' '}
        </label>
        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <div className="buttonDiv">
          <Button colorScheme="blue" variant="solid" type="submit">
            {buttonText}
          </Button>
          {handleDelete && (
            <Button
              type="button"
              onClick={handleDelete}
              variant={'outline'}
              colorScheme="orange"
            >
              Delete
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

export default CategoryForm
