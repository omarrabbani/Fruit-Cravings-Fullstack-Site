import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoredContext'

const FoodItem = ({id,name,price,description,image}) => {
    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-image' src={url+"/images/"+image} alt="" />
            {!cartItems[id]
                ? (<img className='add' onClick={() => addToCart(id)} src={assets.AddIcon} alt="" />)
                : (<div className='food-item-counter'>
                    <img onClick={() => removeFromCart(id)} src={assets.SubtractRed} alt="" />
                    <p>{cartItems[id]}</p>
                    <img onClick={() => addToCart(id)} src={assets.AddGreen} alt="" />
                </div>
            )}
        </div>
        <div className="food-item-info">
            <p className="food-item-name">{name}</p>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
    </div>
  )
}

export default FoodItem
