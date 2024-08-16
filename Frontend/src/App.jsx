import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Loader from './components/loader/Loader'
import ProductDetails from './components/productDetails/ProductDetails'
import Products from './components/product/Products'
import Search from './components/product/Search'
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products/:keyword" element={<Products />} />
<<<<<<< HEAD
        <Route path="/products" element={<Products />}></Route>
        <Route path="/search" element={<Search />}></Route>
=======
        <Route path="/catalog" element={<Products />}></Route>
>>>>>>> 60639194297b5dbd22ae6e607ce651f5bb98ebf7
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
