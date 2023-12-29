import React from 'react'

export default function Button({ onClick, content, className }) {
    return (
        <button onClick={onClick} className={className}>{content}</button>
    )
}
