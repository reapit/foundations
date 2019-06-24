import * as React from 'react'

type alertType = 'primary' | 'danger' | 'success' | 'warning' | 'info'

export interface AlertProps {
  message: string | React.ReactNode
  closable?: boolean
  type?: alertType
  className?: string
  afterClose?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Alert = ({ message, afterClose, className, closable = false, type = 'primary' }: AlertProps) => (
  <div className={`alert alert-${type}` + (className ? ` ${className}` : '')} role="alert">
    {message}
    {closable && (
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={event => {
          if (typeof afterClose !== 'function') {
            console.error('Prop afterClose must be a function')
            return
          }
          afterClose(event)
        }}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    )}
  </div>
)

export default Alert
