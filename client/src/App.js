import React from 'react'
import Header from './components/Header/Header'
import Catalogue from './components/Tabs/Catalogue/Catalogue'
import Cart from './components/Tabs/Cart'
import ProductForm from './components/Tabs/ProductForm'
import Login from './components/Login/Login'
import OrderList from './components/Tabs/OrderList/OrderList'
import AppContext from './AppContext'
import './App.css'

export default function App() {
	const [globalState, setGlobalState] = React.useState({ isAdmin: false })

	const [tab, setTab] = React.useState("Home")
	const [modifyProductId, setModifyProductId] = React.useState(undefined)
	const [searchText, setSearchText] = React.useState('')
	const [token, setToken] = React.useState(null)
	const [userId, setUserId] = React.useState(null)

	const cartButtonOnClick = () => { setTab("Cart") }
	const homeButtonOnClick = () => { setTab("Home") }
	const addButtonOnClick = () => { setTab("ProductForm") }
	const userButtonOnClick = () => { setTab("Login") }
	const orderListButtonOnClick = () => { setTab("OrderList") }

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
		"Login": <Login setToken={setToken} setUserId={setUserId} />,
		"OrderList": <OrderList token={token} />
	}
	
	const appTab = tabs[tab]
	
	React.useEffect(() => {
		if (tab != "ProductForm")
			setModifyProductId(undefined)
	}, [tab])

	return (
		<AppContext.Provider value={{globalState, setGlobalState}}>
		<div className="App">
			<Header
				tab={tab}
				cartButtonOnClick={cartButtonOnClick}
				homeButtonOnClick={homeButtonOnClick}
				addButtonOnClick={addButtonOnClick}
				userButtonOnClick={userButtonOnClick}
				orderListButtonOnClick={orderListButtonOnClick}
				searchProps={{
					searchText: searchText,
					setSearchText: setSearchText
				}}
				/>
			{appTab}
		</div>
		</AppContext.Provider>
	)
}
