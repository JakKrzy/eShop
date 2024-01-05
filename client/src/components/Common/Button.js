import React from 'react'
import './Button.css'

export default function Button({ onClick, content, className }) {
    const [isClicked, setIsClicked] = React.useState(false)
    const handleClick = () => {
        onClick()
        setIsClicked(true)
        setTimeout(() => {
            setIsClicked(false)
        }, 200)
    }

    return (
        <button onClick={handleClick} className={className + (isClicked ? " clicked" : "")}>
            {content}
        </button>
    )
}
