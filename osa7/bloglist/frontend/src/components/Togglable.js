import React, { useState, useImperativeHandle } from 'react'
import Button from './Button'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [ visible, setVisible ] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenHidden = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button handleClick={toggleVisibility} text={props.buttonLabel} id={props.idView} />
      </div>
      <div style={showWhenHidden} className='togglableContent'>
        {props.children}
        <Button handleClick={toggleVisibility} text={props.buttonHideLabel} id={props.idHide} />
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  buttonHideLabel: PropTypes.string.isRequired
}

export default Togglable