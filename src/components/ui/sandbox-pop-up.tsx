import * as React from 'react'
import { ToastMessage } from '@reapit/elements'
import styles from '@/styles/blocks/sandbox-pop-up.scss?mod'

export const HALF_SECOND = 500
export const TEN_SECONDS = 10000

export const popUp = (setOpen, loading) => () => {
  if (!loading) setTimeout(setOpen, HALF_SECOND)
}

export const SandboxPopUp = ({
  loading = false,
  message = 'Data in the dev portal APIs is sandbox and is regularly refreshed. You should not use these feeds for production apps, they are for development purposes only.',
  displayDuration = TEN_SECONDS
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const setOpen = React.useCallback(setIsOpen.bind(null, true), [setIsOpen])
  const setClose = React.useCallback(setIsOpen.bind(null, false), [setIsOpen])

  React.useEffect(popUp(setOpen, loading), [loading])

  return (
    <div className={styles['wrap-pop-up']}>
      <ToastMessage
        visible={isOpen}
        message={message}
        variant="info"
        onCloseToast={setClose}
        displayDuration={displayDuration}
      />
    </div>
  )
}
