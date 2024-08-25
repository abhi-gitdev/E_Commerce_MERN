import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)
  return userInfo && userInfo.role == 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} replace /> //due to replace user cant go back from browser's back button
  )
}
export default AdminRoute
