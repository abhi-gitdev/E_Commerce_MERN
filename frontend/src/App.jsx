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
import ProductsList from './components/admin/ProductsList/ProductsList'
import CreateProduct from './components/admin/ProductsList/CreateProduct'
import ProductCard from './components/common/cards/ProductCard'
import './App.css'
import Home from './components/Home/Home'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productCard" element={<ProductCard />} />
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
          <Route path="createProduct" element={<CreateProduct />} />
          <Route path="productsList" element={<ProductsList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
