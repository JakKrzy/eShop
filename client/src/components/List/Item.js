import React from 'react'
import Button from '../Common/Button'
import './Item.css'

export default function Item({ product }) {
    const [isExpanded, setIsExpanded] = React.useState(false)
    const toggleIsExpanded = () => { setIsExpanded(!isExpanded) }
    const descriptionRef = React.useRef(null)

    React.useEffect(() => {
        if (descriptionRef.current) {
            descriptionRef.current.style.maxHeight = isExpanded ? `${descriptionRef.current.scrollHeight}px` : '0'
        }
    }, [isExpanded, product.description])

    // will probably be dependent on some prop to change behaviour based on user role
    const buttonOnClick = () => {/* TODO */}
    const buttonContent = "Add to cart" 

    return (
        <div className={
            "Item " + (isExpanded ? "expanded" : "collapsed")}>
            <div className="Item-header" onClick={toggleIsExpanded}>
                <img src={product.image} alt={"Image of " + product.name} className="Item-image"/>
                <p className="Item-name">{product.name}</p>
                <div className="Spaceholder"/>
                <p className="Item-price">{"$" + product.price.toString()}</p>
                <Button onClick={buttonOnClick} className="Item-button" content={buttonContent} />
            </div>
            <div className="description">
                <p ref={descriptionRef} className="Item-description">{product.description}</p>
            </div>
        </div>
    )
}
