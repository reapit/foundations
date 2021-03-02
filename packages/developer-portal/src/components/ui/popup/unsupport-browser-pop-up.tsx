import * as React from 'react'
import { ToastMessage } from '@reapit/elements'
import { wrapPopup } from './__styles__/popup'

export const TIMEOUT_DURATION = 500

export const popUp = (setIsOpen, unsupported) => () => {
  if (unsupported) {
    const timeout = setTimeout(() => {
      setIsOpen(true)
    }, TIMEOUT_DURATION)
    return () => {
      clearTimeout(timeout)
    }
  }
}

export const handleCloseToast = (setIsOpen) => () => {
  setIsOpen(false)
}

export const UnsupportBrowserPopUp = ({ unsupported = false, message = '' }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  React.useEffect(popUp(setIsOpen, unsupported), [unsupported])

  return (
    <div className={wrapPopup}>
      <ToastMessage
        preventClose
        visible={isOpen}
        message={message}
        variant="info"
        onCloseToast={handleCloseToast(setIsOpen)}
      />
    </div>
  )
}
