import React from 'react'
import Item from './Item'
import './List.css'

export default function List({ items, itemButtonOnClick, itemButtonArg, itemButtonContent }) {
    return (
        <div>
            <ul className='List'>
                {items.map(
                    (item, index) => <Item product={item} key={index} buttonOnClick={
                        () => itemButtonOnClick(
                            itemButtonArg === "item" ? item : index)} 
                        buttonContent={itemButtonContent}/>)}
            </ul>
        </div>
    )
}
