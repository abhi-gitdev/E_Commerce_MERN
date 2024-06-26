import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { IoIosCart } from 'react-icons/io'
import { CgProfile } from 'react-icons/cg'

const Navbar = () => {
  return (
    <>
      <nav>
        <Link to={'/'} className="link">
          StreetStyleSprint
        </Link>
        <div class="navDiv" id="pageLink">
          <Link to={'/'} className="link">
            Home
          </Link>
          <Link to={'/'} className="link">
            Catalog
          </Link>
          <Link to={'/'} className="link">
            About
          </Link>
        </div>
        <div class="navDiv">
          <Link to={'/'} className="link">
            <IoIosCart style={{ fontSize: '2rem' }} />
          </Link>
          <Link to={'/'} className="link">
            <CgProfile style={{ fontSize: '2rem' }} />
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar
