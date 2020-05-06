import React from 'react';

const Button = (props) => {
    return (
        <button 
            onClick={props.handleClick}
            type={props.type}
        >
            {props.text}
        </button>
    )
}

export default Button