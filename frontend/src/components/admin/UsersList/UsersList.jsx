import React, { useEffect, useState } from 'react'
import {
  useGetUsersQuery,
  useGetUserDetailsQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from '../../../redux/api/usersApiSlice'
import Loader from '../../common/Loader/Loader'
import Message from '../../common/Message/Message'
import Tables from '../../common/Table/Tables'
import './UsersList.css'
const columns = [
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
  {
    Header: 'City',
    accessor: 'city',
  },
  {
    Header: 'State',
    accessor: 'state',
  },
]

const UsersList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery()
  const [deleteUser] = useDeleteUserMutation()
  const [updateUser] = useUpdateUserMutation()

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <div className="usersList">
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={error}>
          {error?.data.message || error.message}
        </Message>
      ) : (
        <Tables rows={users} columns={columns} deleteUser={deleteUser} />
      )}
    </div>
  )
}

export default UsersList
