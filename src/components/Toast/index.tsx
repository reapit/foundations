import * as React from 'react'
import { Button } from '../Button'

/**
 * TODO: Expand component to accept types info and success actions
 * just need to add appropriate actions and adjust the btn-danger
 * class to primary and success
 */

export type ErrorDataType = 'COMPONENT' | 'SERVER' | 'INFO'
export type ButtonVariant = 'danger' | 'info'

export interface ErrorData {
  readonly status?: number
  readonly message?: string
  readonly type: ErrorDataType
}

export interface ToastProps {
  serverError: ErrorData | null
  componentError: ErrorData | null
  errorClearedServer: () => void
  errorClearedComponent: () => void
}

export const getVariant = (type: ErrorDataType): ButtonVariant => {
  let variantClass: ButtonVariant = 'danger'
  // use switch case if we have more options
  if (type === 'INFO') {
    variantClass = 'info'
  }
  return variantClass
}

export const Toast: React.FC<ToastProps> = ({
  serverError,
  componentError,
  errorClearedServer,
  errorClearedComponent
}) => {
  const error = componentError || serverError || null
  const isVisible = Boolean(error)
  const errorClearHandler = error && error.type === 'SERVER' ? errorClearedServer : errorClearedComponent
  const variant = getVariant(error ? error.type : 'INFO')

  if (isVisible) {
    setTimeout(errorClearHandler, 5000)
  }

  return (
    <div data-test="toast-wrapper" className={`toast ${isVisible ? 'visible' : ''}`} onClick={errorClearHandler}>
      <Button type="reset" variant={variant} fullWidth>
        {error && error.message}
      </Button>
    </div>
  )
}
