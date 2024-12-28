import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.FruitLogo} alt="" />
            <p>Random text for now, will change later.</p>
            <div className="footer-social-icons">
                <img src={assets.Facebook} alt="" />
                <img src={assets.Instagram} alt="" />
                <img src={assets.Whatsapp} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-counter-right">
          <h2>Contact Info</h2>
          <ul>
            <li>+1-234-567-8910</li>
            <li>fruitcravings@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">fruitcravings.com - All rights reserved. 2024.</p>
    </div>
  )
}

export default Footer
