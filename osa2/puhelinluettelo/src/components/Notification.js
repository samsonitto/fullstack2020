import React from 'react'

const Notification = ({ message, notClassName }) => {
    if(message === null){
        return null
    }
    return (
        <div className={notClassName}>
            {message}
        </div>
    )
}

export default Notification