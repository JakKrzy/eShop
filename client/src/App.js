import React from 'react';
import Header from './components/Header/Header';
import Catalogue from './components/Tabs/Catalogue'
import Cart from './components/Tabs/Cart'
import './App.css';

export default function App() {
	const [tab, setTab] = React.useState("Home")
	const cartButtonOnClick = () => { setTab("Cart") }
	const homeButtonOnClick = () => { setTab("Home")}
	
	const [cartItems, setCartItems] = React.useState([])
	const addToCart = (product) => { 
		setCartItems([...cartItems, product])
		console.log(cartItems)
	}

	const deleteFromCart = (index) => {
		const updatedCart = [...cartItems]
		updatedCart.splice(index, 1)
		setCartItems(updatedCart)
	}

	const appTab = 
		tab === "Home"
		? <Catalogue onAddToCart={addToCart} />
		: tab === "Cart"
		  ? <Cart cartItems={cartItems} onDeleteFromCart={deleteFromCart}/>
		  : <h1>ERROR 404</h1>

    return (
		<div className="App">
         	<Header tab={tab} cartButtonOnClick={cartButtonOnClick} homeButtonOnClick={homeButtonOnClick}/>
			{appTab}
       	</div>
    )
}
