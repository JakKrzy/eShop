import React from 'react'
import Header from './components/Header/Header'
import Catalogue from './components/Tabs/Catalogue/Catalogue'
import Cart from './components/Tabs/Cart'
import ProductForm from './components/Tabs/ProductForm'
import Login from './components/Login/Login'
import './App.css'

export default function App() {
	const [tab, setTab] = React.useState("Home")
	const [modifyProductId, setModifyProductId] = React.useState(undefined)
	const [searchText, setSearchText] = React.useState('')
	const [token, setToken] = React.useState(null)
	const [userId, setUserId] = React.useState(null)

	const cartButtonOnClick = () => { setTab("Cart") }
	const homeButtonOnClick = () => { setTab("Home") }
	const addButtonOnClick = () => { setTab("ProductForm") }
	const userButtonOnClick= () => { setTab("Login") }

	const [cartItems, setCartItems] = React.useState([])
	const addToCart = (product) => {
		setCartItems([...cartItems, product])
	}

	const deleteFromCart = (index) => {
		const updatedCart = [...cartItems]
		updatedCart.splice(index, 1)
		setCartItems(updatedCart)
	}

	const onModifyProduct = (productId) => {
		setModifyProductId(productId)
		setTab("ProductForm")
	}

	const tabs = {
		"Home": <Catalogue onAddToCart={addToCart} modifyProductOnClick={onModifyProduct} searchText={searchText} />,
		"Cart": <Cart cartItems={cartItems} onDeleteFromCart={deleteFromCart} userId={userId} token={token} />,
		"ProductForm": <ProductForm productId={modifyProductId} finisher={() => setModifyProductId(undefined)} />,
		"Login": <Login setToken={setToken} setUserId={setUserId} />
	}
	
	const appTab = tabs[tab]

	React.useEffect(() => {
		if (tab != "ProductForm")
			setModifyProductId(undefined)
	}, [tab])

	return (
		<div className="App">
			<Header
				tab={tab}
				cartButtonOnClick={cartButtonOnClick}
				homeButtonOnClick={homeButtonOnClick}
				addButtonOnClick={addButtonOnClick}
				userButtonOnClick={userButtonOnClick}
				searchProps={{
					searchText: searchText,
					setSearchText: setSearchText
				}}
			/>
			{appTab}
		</div>
	)
}
