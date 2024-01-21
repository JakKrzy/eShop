import React from 'react'
import Order from './Order'
import Button from '../../Common/Button'
import Icon from '../../Common/Icon'
import './OrderList.css'

export default function OrderList({ token }) {
    const [orders, setOrders] = React.useState([])
    const [pageNumber, setPageNumber] = React.useState(1)
    const [numOfPages, setNumOfPages] = React.useState(1)
    const pageSize = 7
    
    const fetchOrders = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/api/orders` + 
                `?page=${pageNumber}` +
                `&pageSize=${pageSize}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.message}`)
            }

            const respJson = await response.json();
            
            setOrders(respJson.data.orders)
            
            const totalNumOfOrders = respJson.data.count
            const remainder = totalNumOfOrders % pageSize;
            setNumOfPages(
                remainder === 0
                ? totalNumOfOrders / pageSize
                : 1 + (totalNumOfOrders - remainder) / pageSize)

        } catch (error) {
            console.error('Error fetching products', error.message);
        }
    }

    React.useEffect(() => {
        fetchOrders()
    }, [])

    React.useEffect(() => {
        fetchOrders()
    }, [pageNumber])

    const nextPageButton = 
        pageNumber < numOfPages
        ? <Button 
            onClick={() => setPageNumber(pageNumber + 1)}
            content={<Icon iconName="chevron_right" className="Page-nav-icon"/>}
            className="Page-nav-button"/>
        : <></>

    const prevPageButton = 
        pageNumber > 1
        ? <Button 
            onClick={() => setPageNumber(pageNumber - 1)}
            content={<Icon iconName="chevron_left" className="Page-nav-icon"/>}
            className="Page-nav-button"/>
        : <></>

    return (
        <div>
            <ul className='OrderList'>
                {orders.map((order, index) => <Order order={order} key={index} token={token}/>)}
            </ul>
            <div className="Page-nav">
                {prevPageButton}
                <h2>{pageNumber}</h2>
                {nextPageButton}
            </div>
        </div>
    )
    
}