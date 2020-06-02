import * as React from 'react'
import { ToastMessage } from '@reapit/elements'
import styles from '@/styles/blocks/sandbox-pop-up.scss?mod'
import { useSelector } from 'react-redux'
import { selectRefreshSession } from '@/selector/auth'

export const HALF_SECOND = 500

export const popUp = (setOpen, loading) => () => {
  if (!loading) {
    const timeout = setTimeout(setOpen, HALF_SECOND)
    return () => {
      clearTimeout(timeout)
    }
  }
}

export const SandboxPopUp = ({
  loading = false,
  message = 'This is a sandbox environment, with anonymised test data and isolated from production',
}) => {
  const refreshSession = useSelector(selectRefreshSession)
  const loginMode = refreshSession?.mode

  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const setOpen = React.useCallback(setIsOpen.bind(null, true), [setIsOpen])

  React.useEffect(popUp(setOpen, loading), [loading])

  return (
    <div className={`${styles['wrap-pop-up']} ${loginMode === 'DESKTOP' ? styles['wrap-pop-up-desktop'] : ''}`}>
      <ToastMessage visible={isOpen} message={message} variant="info" onCloseToast={setOpen} />
    </div>
  )
}
