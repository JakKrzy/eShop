import React from 'react'
import Button from '../Common/Button'
import './Item.css'

export default function Item({ 
        product,
        buttonOnClick,
        buttonContent,
        displayDeleteButton,
        modifyButtonOnClick }) {
    const [isExpanded, setIsExpanded] = React.useState(false)
    const toggleIsExpanded = () => { setIsExpanded(!isExpanded) }
    const detailsRef = React.useRef(null)

    React.useEffect(() => {
        if (detailsRef.current) {
            detailsRef.current.style.maxHeight = isExpanded ? `${detailsRef.current.scrollHeight}px` : '0'
        }
    }, [isExpanded])

    const deleteProduct = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/products/${product._id}`, {
                method: 'DELETE'
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.message}`)
            }
            window.location.reload(false)
        } catch (error) {
            console.error('Error deleting product:', error.message)
        }
    }

    const modifyButton = 
        modifyButtonOnClick != undefined
        ? <Button onClick={() => modifyButtonOnClick(product._id)} className="Item-button modifyButton" content="Modify" />
        : <></>

    const deleteButton = 
        displayDeleteButton
        ? <Button onClick={deleteProduct} className={"Item-button deleteButton"} content="Delete" />
        : <></>

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
                {modifyButton}
                {deleteButton}
            </div>
            <div ref={detailsRef} className="Details">
                <img src={product.image} alt={"Image of " + product.name} className="Item-image-expanded" />
                <p className="Item-description">{product.description}</p>
            </div>
        </div>
    )
}
