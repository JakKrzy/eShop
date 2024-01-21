import React from 'react'
import List from '../List/List'
import Button from '../Common/Button'
import './Cart.css'

export default function Cart({ cartItems, onDeleteFromCart, userId, token }) {
    const [address, setAddress] = React.useState({
        address: "",
        city: "",
        postalCode: "",
        country: ""
    })

    const cartValue = cartItems.reduce((accumulator, product) => accumulator + product.price, 0)
    const placeOrder = async () => {
        if (userId === null) {
            alert("Only logged in users can make orders!")
            return
        }
        const items = cartItems;
        const orderItems = []
        items.forEach(item => {
            const id = item._id
            const index = orderItems.findIndex(item => item.product == id)
            if (index == -1) {
                orderItems.push({
                    product: id,
                    qty: 1
                })
            } else {
                orderItems[index].qty += 1
            }
        })
        
        const order = {
            user: userId,
            orderItems: orderItems,
            shippingAddress: address,
            totalPrice: cartValue,
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/orders/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(order)
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Message: ${response.message}`)
            }
        } catch (error) {
            console.error('Error creating order: ', error.message)
        }
    }

    const cartContent =
        <div className="Cart-tab">
            <List items={cartItems} itemButtonOnClick={onDeleteFromCart} itemButtonArg="index" itemButtonContent="Delete from cart" />
            <div className="Order-summary">
                <h1>{'$' + cartValue.toString()}</h1>
                <form>
                    <p>Address</p>
                    <input 
                        value={address.address}
                        onChange={e => setAddress({ ...address, address: e.target.value })}/>
                    <p>City</p>
                    <input 
                        value={address.city}
                        onChange={e => setAddress({ ...address, city: e.target.value })}/>
                    <p>Postal code</p>
                    <input 
                        value={address.postalCode}
                        onChange={e => setAddress({ ...address, postalCode: e.target.value })}/>
                    <p>Country</p>
                    <input
                        value={address.country}
                        onChange={e => setAddress({ ...address, country: e.target.value })}/>
                </form>
                <Button content="Order and pay" className="Order-summary-button" onClick={placeOrder} />
            </div>
        </div>

    const cartTab = cartItems.length >= 1 ? cartContent : <h1>You have nothing in Your cart! Click the Home button to browse our catalogue!</h1>

    return (cartTab)
}