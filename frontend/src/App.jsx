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
import CreateProduct from './components/admin/Products/CreateProduct'
import ProductsList from './components/admin/Products/ProductsList'
import Home from './components/Home/Home'
import AllProducts from './components/admin/Products/AllProducts'
import Footer from './components/common/footer/Footer'
import './App.css'
import UpdateProduct from './components/admin/Products/UpdateProduct'
import ProductPage from './components/ProductPage/ProductPage'
import CategoryProducts from './components/ProductPage/CategoryProducts'
import Catalog from './components/ProductPage/Catalog'
import Cart from './components/Cart/Cart'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/category/:id" element={<CategoryProducts />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="my-orders" element={<Dropdown />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="dashboard" element={<Dropdown />} />
          <Route path="orders" element={<Dropdown />} />
          <Route path="users" element={<UsersList />} />
          <Route path="categoryList" element={<CategoryList />} />
          <Route path="createProduct" element={<CreateProduct />} />
          <Route path="updateProduct/:id" element={<UpdateProduct />} />
          <Route path="productsList" element={<ProductsList />} />
          <Route path="allProducts" element={<AllProducts />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
