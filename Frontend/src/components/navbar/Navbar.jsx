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
          <img
            src={logo}
            style={{
              position: 'absolute',
              left: '4rem',
              top: '0rem',
              height: '5rem',
            }}
            alt="Logo"
          />
          StreetStyleSprint
        </Link>
        <div className="navDiv" id="pageLink">
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
        <div className="navDiv">
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
