import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Loader from './components/loader/Loader'
import ProductDetails from './components/productDetails/ProductDetails'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
