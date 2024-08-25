import React, { useEffect } from 'react'
import {
  useGetUsersQuery,
  useGetUserDetailsQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from '../../../redux/api/usersApiSlice'
import Loader from '../../common/Loader/Loader'
import Message from '../../common/Message/Message'
import Tables from '../../common/Table/Tables'

const columns = [
  {
    Header: 'ID',
    accessor: '_id',
  },
  {
    Header: ' First Name',
    accessor: 'firstName',
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
  },
  {
    Header: 'Role',
    accessor: 'role',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Phone Number',
    accessor: 'phone',
  },
]

const UsersList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery()
  const [deleteUser] = useDeleteUserMutation()
  const [updateUser] = useUpdateUserMutation()
  //   console.log(users)

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <div>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={error}>
          {error?.data.message || error.message}
        </Message>
      ) : (
        <Tables rows={users} columns={columns} />
      )}
    </div>
  )
}

export default UsersList
