import React from 'react'

const Input = (props) => {
    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            onChange={props.handleOnChange}
            id={props.id}
            value={props.value}
            name={props.name}
        />
    )
}

export default Input