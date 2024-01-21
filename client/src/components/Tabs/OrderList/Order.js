import React from 'react'
import './Order.css'

const OrderItem = ({ item }) => {
    const [itemName, setItemName] = React.useState('')
    const [itemImg, setItemImg] = React.useState('')
    const [quantity, setQuantity] = React.useState(1)
    const [totalPrice, setTotalPrice] = React.useState(0)

    React.useEffect(() => {
        const setProductDetails = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/products/${item.product}`)
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Message: ${response.message}`)
                }

                const existingProduct = await response.json().then((value) => value.data)
                setItemName(existingProduct.name)
                setItemImg(existingProduct.image)
                setTotalPrice(quantity * existingProduct.price)
            } catch (error) {
                setItemName('Deleted product')
            } finally {
                setQuantity(item.qty)
            }
        }

        setProductDetails()
    }, [])

    return (
        <div className="OrderItem">
            <img src={itemImg} alt={`Image: ${itemName}`} className="order-item-image"/>
            <p>{itemName}</p>
            <p>{`x${quantity}`}</p>
            <p>${totalPrice}</p>
        </div>
    )
}

const UserDetails = ({ order, token }) => {
    const [userName, setUserName] = React.useState(null)

    React.useEffect(() => {
        const fetchUserName = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/${order.user}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (!response.ok) {
                    throw new Error('HTTP error: ' + response.message)
                }

                const userData = await response.json().then(value => value.data)
                setUserName(userData.name)
            } catch (error) {
                console.error('Error fetching user: ' + error.message)
            }
        }
        fetchUserName()
    }, [])

    const address = order.shippingAddress

    return (
        <div className="user-details">
            <p>{userName}</p>
            <p>{`Address: ${address.address} ${address.postalCode} ${address.city} ${address.country}`}</p>
        </div>
    )
}

export default function Order({ order, token }) {
    const [isExpanded, setIsExpanded] = React.useState(false)
    const toggleIsExpanded = () => { setIsExpanded(!isExpanded) }
    const detailsRef = React.useRef(null)

    React.useEffect(() => {
        if (detailsRef.current) {
            detailsRef.current.style.maxHeight = isExpanded ? `${detailsRef.current.scrollHeight}px` : '0'
        }
    }, [isExpanded])

    return (
        <div className={"Order " + (isExpanded ? "expanded" : "collapsed")}>
            <div className="Order-header"onClick={toggleIsExpanded}>
                <p>{`Order ${order._id}`}</p>
                <p>{`Total order value: $${order.totalPrice}`}</p>
            </div>
            <div ref={detailsRef} className="Details Order-details">
                <UserDetails token={token} order={order}/>
                <ul className="Order-details-list">
                    {order.orderItems.map((item, index) => <OrderItem item={item} key={index}/>)}
                </ul>
            </div>
        </div>
    )
}