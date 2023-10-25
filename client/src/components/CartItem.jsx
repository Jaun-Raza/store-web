import React, { useState } from 'react'
import FormatPrice from '../Helpers/FormatPrice';
import CartAmountToggle from './CartAmountToggle'
import { FaTrash } from 'react-icons/fa';

const CartItem = ({ id, name, image, color, price, amount, max, removeCartItem, setDecrease, setIncrease}) => {

    return (
        <div className='cart_heading grid grid-five-column'>
            <div className="cart-image--name">
                <div>
                    <figure>
                        <img src={image} alt={id} />
                    </figure>
                </div>
                <div>
                    <p>{name}</p>
                    <div className="color-div">
                        <p>Color:</p>
                        <div className="color-style" style={{ backgroundColor: color, color: color }}></div>
                    </div>
                </div>
            </div>
            <div className="cart-hide">
                <p><FormatPrice price={price} /></p>
            </div>

            <CartAmountToggle amount={amount} setDecrease={setDecrease} setIncrease={setIncrease} id={id} />

            <div className="cart-hide">
                <p><FormatPrice price={price * amount} /></p>
            </div>

            <div>
                <FaTrash onClick={() => {
                    removeCartItem(id);
                }} className='remove_icon' />
            </div>
            
        </div>
    )
}

export default CartItem