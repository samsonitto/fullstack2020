import React from 'react';

const Button = (props) => {
    return (
        <button 
            onClick={props.handleClick}
            type={props.type}
            id={props.id}
        >
            {props.text}
        </button>
    )
}

export default Button