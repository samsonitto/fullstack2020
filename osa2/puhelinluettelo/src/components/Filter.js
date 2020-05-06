import React from 'react'
import Input from './Input'

const Filter = (props) => {
    return (
        <div>
        Filter by Name: <Input placeholder={'Name..'} handleOnChange={props.handleFilterOnChange} />
      </div>
    )
}

export default Filter