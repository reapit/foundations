import * as React from 'react'
import { Button } from '../Button'

/**
 * TODO: Expand component to accept types info and success actions
 * just need to add appropriate actions and adjust the btn-danger
 * class to primary and success
 */

export interface ErrorData {
  readonly status?: number
  readonly message?: string
  readonly type: 'COMPONENT' | 'SERVER'
}

export interface ToastProps {
  serverError: ErrorData | null
  componentError: ErrorData | null
  errorClearedServer: () => void
  errorClearedComponent: () => void
}

export const Toast: React.FC<ToastProps> = ({
  serverError,
  componentError,
  errorClearedServer,
  errorClearedComponent,
}) => {
  const error = componentError || serverError || null
  const isVisible = Boolean(error)
  const errorClearHandler = error && error.type === 'SERVER' ? errorClearedServer : errorClearedComponent
  if (isVisible) {
    setTimeout(errorClearHandler, 5000)
  }

  return (
    <div data-test="toast-wrapper" className={`toast ${isVisible ? 'visible' : ''}`} onClick={errorClearHandler}>
      <Button type="reset" variant="danger" fullWidth>
        {error && error.message}
      </Button>
    </div>
  )
}
