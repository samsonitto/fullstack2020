import React from 'react'

const Button = (props) => {
    return (
        <button onClick={props.handleOnClick}>{props.text}</button>
    )
}

export default Button