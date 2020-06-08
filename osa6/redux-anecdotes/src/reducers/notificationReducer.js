const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const notificationChange = (notification, time) => {
  return async dispatch => {
    await dispatch({
      type: 'NOTIFICATION',
      notification,
    })

    setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        notification: ''
      })
    }, time * 1000)
    
  }
}

export default notificationReducer