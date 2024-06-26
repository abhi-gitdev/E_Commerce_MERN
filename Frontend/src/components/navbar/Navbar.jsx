import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <>
      <nav>
        <Link to={'/'}>StreetStyleSprint</Link>
        <div class="navDiv" id="pageLink">
          <Link to={'/'}>Home</Link>
          <Link to={'/'}>Menu</Link>
          <Link to={'/'}>About</Link>
        </div>
        <div class="navDiv">
          <Link to={'/'}>Cart</Link>
          <Link to={'/'}>Profile</Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar
