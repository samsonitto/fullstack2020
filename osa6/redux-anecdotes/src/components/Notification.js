import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    background: 'pink',
  }
  console.log(notification === '' ? 'true' : 'false')
  
  return (
    <div style={notification === '' ? undefined : style}>
      {notification}
    </div>
  )
}

export default Notification