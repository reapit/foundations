import * as React from 'react'
import { ToastMessage } from '@reapit/elements'
import styles from '@/styles/blocks/sandbox-pop-up.scss?mod'
import { useSelector } from 'react-redux'
import { selectIsDesktopMode } from '@/selector/auth'

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

export const handleCloseToast = setIsOpen => () => {
  setIsOpen(false)
}

export const UnsupportBrowserPopUp = ({ unsupported = false, message = '' }) => {
  const isDesktopMode = useSelector(selectIsDesktopMode)

  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  React.useEffect(popUp(setIsOpen, unsupported), [unsupported])

  return (
    <div className={`${styles['wrap-pop-up']} ${isDesktopMode ? styles['wrap-pop-up-desktop'] : ''}`}>
      <ToastMessage visible={isOpen} message={message} variant="info" onCloseToast={handleCloseToast(setIsOpen)} />
    </div>
  )
}
