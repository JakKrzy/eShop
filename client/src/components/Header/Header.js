import React from 'react'
import Searchbar from './Searchbar'
import Button from '../Common/Button'
import Icon from '../Common/Icon'
import AppContext from '../../AppContext'
import './Header.css'

export default function Header({
        tab,
        cartButtonOnClick,
        homeButtonOnClick,
        addButtonOnClick,
        userButtonOnClick,
        orderListButtonOnClick,
        searchProps }) {
    
    const {globalState, setGlobalState} = React.useContext(AppContext)
    
    const homeButtonContent = <Icon iconName="home" className="Header-button-icon"/>
    const cartButtonContent = <Icon iconName="shopping_cart" className="Header-button-icon"/>
    const addButtonContent = <Icon iconName="add" className="Header-button-icon"/>
    const userButtonContent = <Icon iconName="person" className="Header-button-icon"/>
    const orderButtonContent = <Icon iconName="receipt_long" className="Header-button-icon"/>

    return (
        <div className="Header">
            <div className="Nav">
                <div className="Logo">
                    <h1>eShop</h1>
                </div>
                <p className="tabName">{tab}</p>
            </div>
            <Searchbar props={searchProps}/>
            <div className="Menu">
                {globalState.isAdmin
                    ? <Button onClick={addButtonOnClick} content={addButtonContent} className="Header-button"/>
                    : <></>}
                {globalState.isAdmin
                    ? <Button onClick={orderListButtonOnClick} content={orderButtonContent} className="Header-button"/>
                    : <></>}
                <Button onClick={homeButtonOnClick} content={homeButtonContent} className="Header-button"/>
                <Button onClick={cartButtonOnClick} content={cartButtonContent} className="Header-button"/>
                <Button onClick={userButtonOnClick} content={userButtonContent} className="Header-button"/>
            </div>
        </div>
    )
}
