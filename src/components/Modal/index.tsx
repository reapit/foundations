import * as React from 'react'
import { usePortal } from '../../hooks/UsePortal'

const { useMemo, useEffect } = React

export interface ModalProps {
  children: React.ReactChild
  title?: string
  visible: boolean
  size?: 'medium' | 'small'
  afterClose?: () => void
  deps?: any[]
  header?: React.ReactNode
  renderChildren?: boolean
  footerItems?: React.ReactNode
  className?: string
  HeaderComponent?: React.FC
}

export interface ModalHeaderProps {
  title: string
  afterClose: () => void
}

export const ModalFooter: React.SFC<{ footerItems: React.ReactNode }> = ({ footerItems }) => (
  <footer className="modal-card-foot">{footerItems}</footer>
)

export const ModalBody: React.SFC<{ body: React.ReactNode }> = ({ body }) => (
  <section className="modal-card-body">{body}</section>
)

export const ModalHeader: React.SFC<ModalHeaderProps> = ({ title, afterClose }) => (
  <header className="modal-card-head">
    <h4 className="modal-card-title is-4">{title}</h4>
    <button
      className="delete"
      aria-label="close"
      data-test="modal-close-button"
      onClick={event => {
        event.preventDefault()
        afterClose && afterClose()
      }}
    />
  </header>
)

export const Modal: React.FunctionComponent<ModalProps> = ({
  title,
  children,
  afterClose,
  visible,
  size = 'medium',
  deps,
  footerItems,
  renderChildren,
  className = '',
  HeaderComponent
}) => {
  // CLD-250: https://reapit.atlassian.net/secure/RapidBoard.jspa?rapidView=200&view=planning&selectedIssue=CLD-250
  // we can't access the showPortal in the component passed to usePortal
  // So we have to generate an id to it
  // bind event listener (click) to the element that match the ID
  const generatedModalBackgroundId = useMemo(() => {
    return Math.random()
      .toString(36)
      .substring(7)
  }, [])

  const [showPortal, hidePortal] = usePortal(
    () => (
      <div className={`modal is-active ${className}`} data-test="modal">
        <div
          className="modal-background"
          data-test="modal-background"
          id={generatedModalBackgroundId}
          onClick={afterClose}
        />
        <div
          className={'modal-content ' + (size === 'medium' ? 'modal-medium' : 'modal-small')}
          data-test="modal-content"
        >
          <div className="modal-card">
            {renderChildren ? (
              children
            ) : (
              <>
                {HeaderComponent && <HeaderComponent />}
                {!HeaderComponent && afterClose && title && <ModalHeader title={title} afterClose={afterClose} />}
                {children && <ModalBody body={children} />}
                {footerItems && <ModalFooter footerItems={footerItems} />}
              </>
            )}
          </div>
        </div>
      </div>
    ),
    deps || [children]
  )

  useEffect(() => {
    if (visible) {
      showPortal()
    } else {
      hidePortal()
    }
  }, [visible])

  // CLD-250: handle click useEffect
  useEffect(() => {
    if (visible) {
      let element: HTMLElement | null
      let handleHidePortal = () => {
        hidePortal()
        afterClose && afterClose()
      }

      /**
       * Render function run asychonously.
       * Have to put this to the bottom of the Event loop queue
       */
      setTimeout(() => {
        element = document.getElementById(generatedModalBackgroundId)

        if (element) {
          element.addEventListener('click', handleHidePortal)
        }
      }, 1)

      return () => {
        if (element) {
          element.removeEventListener('click', handleHidePortal)
        }
      }
    }
  }, [visible])

  // CLD-250: handle key press useEffect
  useEffect(() => {
    const handleKeypressHidePortal = (e: KeyboardEvent) => {
      if (e.keyCode === 27 || e.key === 'Esc') {
        hidePortal()
        afterClose && afterClose()
      }
    }

    document.addEventListener('keydown', handleKeypressHidePortal)

    return () => {
      document.removeEventListener('keydown', handleKeypressHidePortal)
    }
  }, [])

  return null
}
