import Login from './components/auth/login/Login'
import Register from './components/auth/register/Register'
import Dropdown from './components/common/dropdown/Dropdown'
import Navbar from './components/common/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Profile from './components/user/Profile'
import AdminRoute from './components/AdminRoute'
import UsersList from './components/admin/UsersList/UsersList'
import CategoryList from './components/admin/CategoryList/CategoryList'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/d" element={<Dropdown />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="my-orders" element={<Dropdown />} />
        </Route>
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="dashboard" element={<Dropdown />} />
          <Route path="products" element={<Dropdown />} />
          <Route path="orders" element={<Dropdown />} />
          <Route path="users" element={<UsersList />} />
          <Route path="categoryList" element={<CategoryList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
