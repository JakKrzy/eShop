import React from 'react'
import Searchbar from './Searchbar'
import Button from '../Common/Button'
import Icon from '../Common/Icon'
import './Header.css'

export default function Header({ tab }) {
    const cartButtonContent = <Icon iconName="shopping_cart" className="Header-button"/>
    const cartButtonOnClick = () => { /* TODO */ }
    const userButtonContent = <Icon iconName="person" className="Header-button"/>
    const userButtonOnClick = () => { /* TODO */ }

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
                <Button onClick={cartButtonOnClick} content={cartButtonContent} />
                <Button onClick={userButtonOnClick} content={userButtonContent} />
            </div>
        </div>
    )
}
