import React from 'react'

export default function Icon({ iconName, className="" }) {
    return (
        <span className={className + " material-symbols-outlined"}>{iconName}</span>
    )
}