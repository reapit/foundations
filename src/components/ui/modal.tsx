import * as React from 'react'
import bulma from '@/styles/vendor/bulma'
import { usePortal } from '@/hooks/use-portal'
const { modal, modalContent, modalClose, modalBackground, box, isActive, isLarge, isH4 } = bulma

export interface ModalProps {
  children: React.ReactChild
  title?: string
  visible: boolean
  afterClose?: () => void
}

const Modal: React.FunctionComponent<ModalProps> = ({ title, children, afterClose, visible }) => {
  const [showPortal, hidePortal] = usePortal(() => (
    <div className={modal + ` ${isActive}`} data-test="modal">
      <div className={modalBackground} data-test="modal-background" />
      <div className={modalContent} data-test="modal-content">
        <div className={box}>
          {title && <h4 className={bulma.title + ' ' + isH4}>{title}</h4>}
          {children}
        </div>
      </div>
      <button
        className={modalClose + ' ' + isLarge}
        data-test="modal-close-button"
        aria-label="close"
        onClick={event => {
          event.preventDefault()
          afterClose && afterClose()
        }}
      />
    </div>
  ))

  React.useEffect(() => {
    if (visible) {
      showPortal()
    } else {
      hidePortal()
    }
  }, [visible])

  return null
}

export default Modal
