import { cx } from 'linaria'
import * as React from 'react'
import { Button } from '../Button'

export type ToastVariant = 'primary' | 'secondary' | 'danger' | 'info'

export interface ToastMessageProps {
  visible?: boolean
  displayDuration?: number
  message: string
  variant: ToastVariant
  onCloseToast: () => void
  preventClose?: boolean
  hasNavBar?: boolean
}

export const ToastMessage: React.FC<ToastMessageProps> = ({
  visible = false,
  displayDuration = 3000,
  preventClose = false,
  hasNavBar = false,
  message,
  onCloseToast,
  variant,
}) => {
  React.useEffect(() => {
    if (visible && !preventClose) {
      const timeout = setTimeout(onCloseToast, displayDuration)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [visible, preventClose])

  return (
    <div
      data-test="toast-wrapper"
      className={cx('toast', visible && 'visible', hasNavBar && 'has-nav-bar')}
      onClick={onCloseToast}
    >
      <Button type="reset" variant={variant} fullWidth>
        {message}
      </Button>
    </div>
  )
}
