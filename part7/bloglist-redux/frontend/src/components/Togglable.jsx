import { useState, forwardRef, useImperativeHandle } from 'react'
import { useLocation } from 'react-router-dom'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const isRoot = location.pathname === '/'

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  if (!isRoot) return null

  return (
    <div className="mb-3">
      {!visible && (
        <div className="mb-2">
          <button
            className="btn btn-primary"
            onClick={toggleVisibility}
          >
            {props.buttonLabel}
          </button>
        </div>
      )}
      {visible && (
        <div className="card">
          <div className="card-body">
            {props.children}
            <button
              className="btn btn-secondary mt-3"
              onClick={toggleVisibility}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable