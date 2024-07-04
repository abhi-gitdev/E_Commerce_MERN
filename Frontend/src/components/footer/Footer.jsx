import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
const Footer = () => {
  return (
    <footer>
      <div className="footer-section">
        <h4>Customer Service</h4>
        <ul>
          <li>
            <Link to="/help">Help & FAQs</Link>
          </li>
          <li>
            <Link to="/returns">Returns & Exchanges</Link>
          </li>
          <li>
            <Link to="/shipping">Shipping Information</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Company</h4>
        <ul>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/terms">Terms & Conditions</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
export default Footer
