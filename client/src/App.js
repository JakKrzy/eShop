import React from 'react';
import Header from './components/Header/Header';
import Catalogue from './components/Tabs/Catalogue/Catalogue'
import Cart from './components/Tabs/Cart'
import ProductForm from './components/Tabs/ProductForm';
import Login from './components/Login/Login';
import './App.css';

export default function App() {
	const [tab, setTab] = React.useState("Home")
	const [modifyProductId, setModifyProductId] = React.useState(undefined)
	const [searchText, setSearchText] = React.useState('')

	const cartButtonOnClick = () => { setTab("Cart") }
	const homeButtonOnClick = () => { setTab("Home") }
	const addButtonOnClick = () => { setTab("ProductForm") }
	const userButtonOnClick= () => {setTab("Login") }

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

	const [token, setToken] = React.useState(null)


	var appTab
	if (tab === "Home")
		appTab = <Catalogue onAddToCart={addToCart} modifyProductOnClick={onModifyProduct} searchText={searchText} />
	else if (tab === "Cart")
		appTab = <Cart cartItems={cartItems} onDeleteFromCart={deleteFromCart} />
	else if (tab === "ProductForm")
		appTab = <ProductForm productId={modifyProductId} finisher={() => setModifyProductId(undefined)}/>
	else if (tab === "Login")
		appTab = <Login setToken={setToken}/>
	else
		appTab = <h1>ERROR 404</h1>

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
