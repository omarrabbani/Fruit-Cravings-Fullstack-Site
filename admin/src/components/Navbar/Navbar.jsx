import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.FruitLogo} alt="" />
      <img className='profile' src={assets.ProfileImage} alt="" />
    </div>
  )
}

export default Navbar
