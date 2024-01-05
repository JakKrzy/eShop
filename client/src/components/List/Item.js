import React from 'react'
import Button from '../Common/Button'
import './Item.css'

export default function Item({ product, buttonOnClick, buttonContent }) {
    const [isExpanded, setIsExpanded] = React.useState(false)
    const toggleIsExpanded = () => { setIsExpanded(!isExpanded) }
    const detailsRef = React.useRef(null)

    React.useEffect(() => {
        if (detailsRef.current) {
            detailsRef.current.style.maxHeight = isExpanded ? `${detailsRef.current.scrollHeight}px` : '0'
        }
    }, [isExpanded])

    return (
        <div className={"Item " + (isExpanded ? "expanded" : "collapsed")}>
            <div className="Item-short">
                <div className="Item-header"onClick={toggleIsExpanded}>
                    <img src={product.image} alt={"Image of " + product.name} className="Item-image"/>
                    <p className="Item-name">{product.name}</p>
                    <div className="Spaceholder"/>
                    <p className="Item-price">{"$" + product.price.toString()}</p>
                </div>
                <Button onClick={buttonOnClick} className="Item-button" content={buttonContent} />
            </div>
            <div ref={detailsRef} className="Details">
                <img src={product.image} alt={"Image of " + product.name} className="Item-image-expanded" />
                <p className="Item-description">{product.description}</p>
            </div>
        </div>
    )
}
