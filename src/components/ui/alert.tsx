import * as React from 'react'
import bulma from '../../styles/vendor/bulma'

type alertType = 'primary' | 'danger' | 'success' | 'warning' | 'info'

export interface AlertProps {
  message: string | React.ReactNode
  closable?: boolean
  type?: alertType
  className?: string
  dataTest?: string
  afterClose?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const { notification, isPrimary, isSuccess, isDanger } = bulma

const Alert = ({ message, afterClose, className, closable = false, type = 'primary', dataTest = '' }: AlertProps) => {
  const alertType = type === 'warning' || type === 'danger' ? isDanger : type === 'success' ? isSuccess : isPrimary
  return (
    <div
      className={`${notification} ${alertType}` + (className ? ` ${className}` : '')}
      role="alert"
      data-test={dataTest}
    >
      {message}
      {closable && (
        <button
          type="button"
          className="close"
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
}

export default Alert
