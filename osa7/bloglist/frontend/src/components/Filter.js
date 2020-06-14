import React from 'react'
import Input from './Input'
import Header2 from './Header2'

const Filter = (props) => {
    return (
        <div>
        <Header2 text={'Search'} />
        Filter by Name: <Input placeholder={'Name..'} handleOnChange={props.handleFilterOnChange} />
      </div>
    )
}

export default Filter