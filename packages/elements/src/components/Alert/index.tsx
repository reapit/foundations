import * as React from 'react'

export type AlertType = 'primary' | 'danger' | 'success' | 'warning' | 'info'

export interface AlertProps {
  message: string | React.ReactNode
  closable?: boolean
  type?: AlertType
  className?: string
  dataTest?: string
  afterClose?: (event: React.MouseEvent<HTMLButtonElement>) => void
  children?: React.ReactNode
}

export const Alert: React.SFC<AlertProps> = ({
  message,
  afterClose,
  className,
  closable = false,
  type = 'primary',
  dataTest = '',
  children,
}: AlertProps) => {
  const alertType =
    type === 'warning' || type === 'danger'
      ? 'is-danger'
      : type === 'success'
      ? 'is-success'
      : type === 'info'
      ? 'is-info'
      : 'is-primary'
  return (
    <div className={`notification ${alertType} ${className ? className : ''}`} role="alert" data-test={dataTest}>
      {message}
      {children}
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
