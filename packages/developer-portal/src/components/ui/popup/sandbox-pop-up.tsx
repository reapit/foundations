import * as React from 'react'
import { ToastMessage } from '@reapit/elements'
import { wrapPopup } from './__styles__/popup'

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
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const setOpen = React.useCallback(setIsOpen.bind(null, true), [setIsOpen])

  React.useEffect(popUp(setOpen, loading), [loading])

  return (
    <div className={wrapPopup}>
      <ToastMessage visible={isOpen} message={message} variant="primary" onCloseToast={setOpen} />
    </div>
  )
}
