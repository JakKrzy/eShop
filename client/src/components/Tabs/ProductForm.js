import React from 'react'
import Button from '../Common/Button'
import './ProductForm.css'

export default function ProductForm({ productId, finisher }) {
    const [formData, setFormData] = React.useState({
        name: '',
        image: '',
        description: '',
        price: 0,
        stock: 0
    })

    React.useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = 
                    await fetch(`http://localhost:3000/api/products/${productId}`)

                if (!response.ok) {
                    throw new Error(`HTTP error! Message: ${response.message}`)
                }

                const existingProduct = await response.json().then((value) => value.data)
                console.log(existingProduct)
                setFormData(existingProduct)
            } catch (error) {
                console.error('Error fetching product details:', error.message)
            }
        }
        if (productId !== undefined)
            fetchProductDetails()
    }, [productId])

    const formHeader = productId !== undefined ? 'Modify product' : 'Add a new product'

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const submitNewProduct = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Message: ${response.message}`)
                }
    
                const respJson = await response.json()
                const createdProduct = respJson.formData
                console.log('Product added:', createdProduct)
                window.location.reload(false)
            } catch (error) {
                console.error('Error creating product:', error.message)
            }
        }

        const submitModifiedProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Message: ${response.message}`)
                }
    
                const respJson = await response.json()
                const modifiedProduct = respJson.formData
                console.log('Product modified:', modifiedProduct)
                window.location.reload(false)
            } catch (error) {
                console.error('Error creating product:', error.message)
            }
        }

        if (productId !== undefined)
            submitModifiedProduct()
        else
            submitNewProduct()
        finisher()
    }

    return (
        <div className="form-parent">
            <h2>{formHeader}</h2>
            <form onSubmit={handleSubmit} className="form">
                <label className="form-label">
                    Name
                    <span className="form-spaceholder"/>
                    <input 
                        className="form-input"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label className="form-label">
                    Image URL
                    <span className="form-spaceholder"/>
                    <input 
                        className="form-input"
                        name="image"
                        type="text"
                        value={formData.image}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label className="form-label">
                    Description
                    <span className="form-spaceholder"/>
                    <textarea
                        className="form-input"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label className="form-label">
                    Price
                    <span className="form-spaceholder"/>
                    <input
                        className="form-input"
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label className="form-label">
                    Stock
                    <span className="form-spaceholder"/>
                    <input
                        className="form-input"
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <Button onClick={()=>{}} className={"form-submit-button"} content="Submit" type="submit"/>
            </form>
        </div>
    )
}