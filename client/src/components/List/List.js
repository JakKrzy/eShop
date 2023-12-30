import React from 'react'
import Item from './Item'
import './List.css'

export default function List({ items }) {
    return (
        <div>
            <ul className='List'>
                {items.map((item, index) => <Item product={item} key={index}/>)}
            </ul>
        </div>
    )
}
