import * as React from 'react'
import { ToastMessage } from '@reapit/elements'
import styles from '@/styles/blocks/sandbox-pop-up.scss?mod'
import { useSelector } from 'react-redux'
import { selectRefreshSession } from '@/selector/auth'

export const TIMEOUT_DURATION = 500

export const popUp = (setOpen, unsupported) => () => {
  if (unsupported) {
    const timeout = setTimeout(setOpen, TIMEOUT_DURATION)
    return () => {
      clearTimeout(timeout)
    }
  }
}

export const UnsupportBrowerPopUp = ({
  unsupported = false,
  // eslint-disable-next-line
  message = 'Unsupported Browser - Unfortunately as Internet Explorer 11 is no longer supported, we are unable to display the documentation, please login to the Developer Portal using either Chrome, Firefox, Safari or Edge',
}) => {
  const refreshSession = useSelector(selectRefreshSession)
  const loginMode = refreshSession?.mode

  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const setOpen = React.useCallback(setIsOpen.bind(null, true), [setIsOpen])

  React.useEffect(popUp(setOpen, unsupported), [unsupported])

  return (
    <div className={`${styles['wrap-pop-up']} ${loginMode === 'DESKTOP' ? styles['wrap-pop-up-desktop'] : ''}`}>
      <ToastMessage visible={isOpen} message={message} variant="info" onCloseToast={setOpen} />
    </div>
  )
}
