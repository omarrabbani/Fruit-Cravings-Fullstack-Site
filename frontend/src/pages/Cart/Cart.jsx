import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoredContext'
import './Cart.css'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const {cartItems,food_list,removeFromCart, getTotalCartAmount,url} = useContext(StoreContext);
    const navigate = useNavigate();
    
    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item,index)=>{
                    if(cartItems[item._id] > 0){
                        return(
                            <div>
                                <div className='cart-items-title cart-items-item'>
                                    <img src={url+"/images/"+item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>${cartItems[item._id]*item.price}</p>
                                    <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                                </div>
                                <hr />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${(getTotalCartAmount()).toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount()===0?0:2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>
                                ${getTotalCartAmount()===0?0:(getTotalCartAmount()+2).toFixed(2)}
                            </b>
                        </div>
                    </div>
                    <button onClick={()=> navigate('/order')}>Proceed To Checkout</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>Enter promo codes here.</p>
                        <div className="card-promocode-input">
                            <input type="text" placeholder='promo code' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
