import * as React from 'react'
import { usePortal } from '../../hooks/UsePortal'

export interface ModalProps {
  children: React.ReactChild
  title?: string
  visible: boolean
  size?: 'medium' | 'small'
  afterClose?: () => void
  deps?: any[]
}

export const Modal: React.FunctionComponent<ModalProps> = ({
  title,
  children,
  afterClose,
  visible,
  size = 'medium',
  deps
}) => {
  const [showPortal, hidePortal] = usePortal(
    () => (
      <div className="modal is-active" data-test="modal">
        <div className="modal-background" data-test="modal-background" />
        <div
          className={'modal-content ' + (size === 'medium' ? 'modal-medium' : 'modal-small')}
          data-test="modal-content"
        >
          <div className="box">
            {title && <h4 className="title is-4">{title}</h4>}
            {children}
          </div>
        </div>
        <button
          className="modal-close is-large"
          data-test="modal-close-button"
          aria-label="close"
          onClick={event => {
            event.preventDefault()
            afterClose && afterClose()
          }}
        />
      </div>
    ),
    deps || [children]
  )

  React.useEffect(() => {
    if (visible) {
      showPortal()
    } else {
      hidePortal()
    }
  }, [visible])

  return null
}
