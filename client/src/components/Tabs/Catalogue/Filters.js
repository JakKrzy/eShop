import React from 'react'
import Button from '../../Common/Button'
import './Filters.css'

export default function Filters({ maxPriceProps, sortingProps}) {
    const onMaxPriceChange = (e) => {
        maxPriceProps.setMaxPrice(e.target.value)
    }

    const onSortingOrderChange = (e) => {
        sortingProps.setSortingOrder(e.target.value)
    }

    return (
        <div className='Filters'>
            <h2>Filters</h2>
            <form className='form' onSubmit={(e) => { e.preventDefault() }}>
                <h3>Max price</h3>
                <input
                    className='max-price-input'
                    type='number'
                    value={maxPriceProps.maxPrice}
                    onChange={onMaxPriceChange}
                />
                <h3>Sorting</h3>
                <select 
                    className='sorting-select'
                    value={sortingProps.sortingOrder}
                    onChange={onSortingOrderChange}>
                    <option value='price:asc'>From lower prices</option>
                    <option value='price:desc'>From higher prices</option>
                </select>
            </form>
        </div>
    )
}