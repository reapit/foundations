import * as React from 'react'
import { Button } from '../Button'

export type ToastVariant = 'primary' | 'secondary' | 'danger' | 'info'

export interface ToastMessageProps {
  visible?: boolean
  displayDuration?: number
  message: string
  variant: ToastVariant
  onCloseToast: () => void
}

export const ToastMessage: React.FC<ToastMessageProps> = ({
  visible = false,
  displayDuration = 3000,
  message,
  onCloseToast,
  variant
}) => {
  if (visible) {
    setTimeout(onCloseToast, displayDuration)
  }

  return (
    <div data-test="toast-wrapper" className={`toast ${visible ? 'visible' : ''}`} onClick={onCloseToast}>
      <Button type="reset" variant={variant} fullWidth>
        {message}
      </Button>
    </div>
  )
}
