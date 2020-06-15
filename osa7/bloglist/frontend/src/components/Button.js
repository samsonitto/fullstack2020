import React from 'react'
import { Button as Btn } from 'react-bootstrap'

const Button = (props) => {
    return (
        <Btn 
            onClick={props.handleClick}
            type={props.type}
            id={props.id}
            variant={props.variant}
            className={props.className}
        >
            {props.text}
        </Btn>
    )
}

export default Button