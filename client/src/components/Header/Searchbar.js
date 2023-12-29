import React from 'react'
import Icon from '../Common/Icon'
import './Searchbar.css'

export default function Searchbar() {
    const [iconClass, setIconClass] = React.useState("icon-enabled")
    const onFocus = () => setIconClass("icon-disabled")
    const onBlur = () => setIconClass("icon-enabled")

    return (
        <div className="Searchbar-space">
            <form>
                <Icon iconName={"search"} className={iconClass} />
                <input 
                    type="text"
                    className="Searchbar"
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            </form>
        </div>
    )
}
