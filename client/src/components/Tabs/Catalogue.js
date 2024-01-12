import React from 'react'
import List from '../List/List'

export default function Catalogue({ onAddToCart, modifyProductOnClick }) {
	const [products, setProducts] = React.useState([])
	React.useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch('http://localhost:3000/api/products')
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
	}, [])

	return (
		<List items={products} itemButtonOnClick={onAddToCart} itemButtonArg="item" itemButtonContent="Add to cart" onModifyButton={modifyProductOnClick}/>
	)
}