import React from 'react'
import Icon from '../Common/Icon'
import './Searchbar.css'

export default function Searchbar({ props }) {
    const [iconClass, setIconClass] = React.useState("icon-enabled")
    const onFocus = () => setIconClass("icon-disabled")
    const onBlur = () => setIconClass("icon-enabled")
    const onSubmit = (e) => {
        e.preventDefault()
    }

    const handleValueChange = (e) => {
        props.setSearchText(e.target.value)
    }


    return (
        <div className="Searchbar-space">
            <form onSubmit={onSubmit}>
                <Icon iconName={"search"} className={iconClass} />
                <input 
                    type="text"
                    className="Searchbar"
                    value={props.searchText}
                    onChange={handleValueChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            </form>
        </div>
    )
}
