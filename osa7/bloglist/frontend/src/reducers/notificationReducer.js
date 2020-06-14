const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

let timer

export const notificationChange = (notification, time) => {
  return async dispatch => {
    await dispatch({
      type: 'NOTIFICATION',
      notification,
    })

    clearTimeout(timer)

    timer = setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        notification: { msg: '', msgClass: undefined },
        timeout: true
      })
    }, time * 1000)
    
  }
}

export default notificationReducer