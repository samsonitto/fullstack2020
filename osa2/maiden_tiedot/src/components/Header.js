import React from "react"

const Header = (props) => {
    if(props.type === 'h1') {
        return (
            <h1>{props.text}</h1>
        )
    }
    return (
        <h2>{props.text}</h2>
    )
}

export default Header