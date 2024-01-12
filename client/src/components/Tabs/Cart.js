import React from 'react'
import List from '../List/List'
import Button from '../Common/Button'
import './Cart.css'

export default function Cart({ cartItems, onDeleteFromCart }) {

    const cartValue = cartItems.reduce((accumulator, product) => accumulator + product.price, 0)
    const placeOrder = () => { console.log(cartItems) /* TODO */ }


    const cartContent =
        <div className="Cart-tab">
            <List items={cartItems} itemButtonOnClick={onDeleteFromCart} itemButtonArg="index" itemButtonContent="Delete from cart" />
            <div className="Order-summary">
                <h1>{'$' + cartValue.toString()}</h1>
                <Button content="Order and pay" className="Order-summary-button" onClick={placeOrder} />
            </div>
        </div>

    const cartTab = cartItems.length >= 1 ? cartContent : <h1>You have nothing in Your cart! Click the Home button to browse our catalogue!</h1>

    return (cartTab)
}