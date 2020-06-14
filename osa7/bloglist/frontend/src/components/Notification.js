import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  
  return (
    <div className={notification.msgClass}>
        {notification.msg}
    </div>
  )
}

export default Notification