import React from 'react'
import Searchbar from './Searchbar'
import Button from '../Common/Button'
import Icon from '../Common/Icon'
import './Header.css'

export default function Header({ 
    tab, cartButtonOnClick, homeButtonOnClick, addButtonOnClick, userButtonOnClick }) {
    const homeButtonContent = <Icon iconName="home" className="Header-button-icon"/>
    const cartButtonContent = <Icon iconName="shopping_cart" className="Header-button-icon"/>
    const addButtonContent = <Icon iconName="add" className="Header-button-icon"/>
    const userButtonContent = <Icon iconName="person" className="Header-button-icon"/>

    return (
        <div className="Header">
            <div className="Nav">
                <div className="Logo">
                    <h1>eShop</h1>
                </div>
                <p className="tabName">{tab}</p>
            </div>
            <Searchbar/>
            <div className="Menu">
                <Button onClick={addButtonOnClick} content={addButtonContent} className="Header-button"/>
                <Button onClick={homeButtonOnClick} content={homeButtonContent} className="Header-button"/>
                <Button onClick={cartButtonOnClick} content={cartButtonContent} className="Header-button"/>
                <Button onClick={userButtonOnClick} content={userButtonContent} className="Header-button"/>
            </div>
        </div>
    )
}
