import React from 'react'
import List from '../../List/List'
import Button from '../../Common/Button'
import Icon from '../../Common/Icon'
import Filters from './Filters'
import './Catalogue.css'

export default function Catalogue({ onAddToCart, modifyProductOnClick, searchText }) {
	const [products, setProducts] = React.useState([])
	const [pageNumber, setPageNumber] = React.useState(1)
	const [maxPrice, setMaxPrice] = React.useState(0)
	const [sortingOrder, setSortingOrder] = React.useState('price:asc')
	const pageSize = 7

	React.useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_SERVER_URL}/api/products` + 
					`?name=${searchText}` +
					`&price=${maxPrice}` +
					`&page=${pageNumber}` +
					`&pageSize=${pageSize}` +
					`&sort=${sortingOrder}`)
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.message}`)
				}

				const respJson = await response.json();
				setProducts(respJson.data)
			} catch (error) {
				console.error('Error fetching products', error.message);
			}
		}

		fetchProducts()
	}, [searchText, pageNumber, maxPrice, sortingOrder])

	const prevButtonOnClick = () => {
		if (pageNumber > 1)
			setPageNumber(pageNumber - 1)
	}

	const nextButtonOnClick = () => {
		setPageNumber(pageNumber + 1)
	}

	return (
		<div className='Catalogue'>
			<Filters
				maxPriceProps={{ 
					maxPrice: maxPrice,
					setMaxPrice: setMaxPrice }}
				sortingProps={{
					sortingOrder: sortingOrder,
					setSortingOrder: setSortingOrder
				}}
				/>
			<div>
				<List items={products} itemButtonOnClick={onAddToCart} itemButtonArg="item" itemButtonContent="Add to cart" onModifyButton={modifyProductOnClick}/>
				<div className='Page-nav'>
					{pageNumber > 1 ?
						<Button 
							content={<Icon iconName={'chevron_left'} className='Page-nav-icon'/>}
							className='Page-nav-button'
							onClick={prevButtonOnClick}/>
						: <></>}
					<h2 className='Page-number'>{pageNumber}</h2>
					{products.length === pageSize ?
						<Button 
							content={<Icon iconName={'chevron_right'} className='Page-nav-icon'/>}
							className='Page-nav-button'
							onClick={nextButtonOnClick}/>
						: <></>}
				</div>
			</div>
		</div>
	)
}