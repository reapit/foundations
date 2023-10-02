import React, { FC, ReactNode, MouseEvent } from 'react'
import { ReapitConnectBrowserSession } from '@reapit/connect-session'
import { Button, ButtonGroup, elMt11, ModalProps, useModal } from '@reapit/elements'

export type TargetType = '_blank' | '_self'

export enum AcProcessType {
  web = 'agencycloud://process/webpage?url=',
  mail = 'agencycloud://process/email?address=',
  app = 'agencycloud://app?id={acId}&launchUri=',
}

export interface ConsentModalType {
  title: string
  body: ReactNode
}

export interface DesktopLinkProps {
  content: ReactNode
  target: TargetType
  acProcess: AcProcessType
  uri?: string
  acId?: string
  onClick?: () => void
  consentModal?: ConsentModalType
}

export interface ConsentModalProps {
  Modal: FC<Partial<ModalProps>>
  closeModal: () => void
  navigate: () => void
  consentModal?: ConsentModalType
}

export const getAcUri = (acProcess: AcProcessType, uri: string, acId?: string) => {
  if (acProcess === AcProcessType.app) {
    return `${AcProcessType.app.replace('{acId}', acId ?? '')}${uri}`
  }

  if (acProcess === AcProcessType.mail) {
    return `${AcProcessType.mail}${uri}`
  }

  return `${AcProcessType.web}${uri}`
}

export const handleNavigate =
  (
    target: TargetType,
    href: string,
    closeConsentModal: (() => void) | null,
    isDesktop: boolean,
    onClick?: () => void,
  ) =>
  () => {
    if (onClick) onClick()
    if (closeConsentModal) closeConsentModal()

    if (target === '_blank' && !isDesktop) {
      window.open(href, '_blank', 'noopener noreferrer')
    } else {
      window.location.href = href
    }
  }

export const handleOnClick =
  (openModal: () => void, navigate: () => void, consentModal?: ConsentModalType) =>
  (event: MouseEvent<HTMLAnchorElement>) => {
    if (consentModal) {
      event?.preventDefault()
      openModal()
      return
    }

    navigate()
  }

export const ConsentModal: FC<ConsentModalProps> = ({ Modal, closeModal, navigate, consentModal }) => {
  if (!consentModal) return null

  const { title, body } = consentModal
  return (
    <Modal title={title}>
      {body}
      <ButtonGroup alignment="center" className={elMt11}>
        <Button intent="default" onClick={closeModal}>
          Cancel
        </Button>
        <Button intent="primary" onClick={navigate}>
          Continue
        </Button>
      </ButtonGroup>
    </Modal>
  )
}

export const DesktopLink: FC<DesktopLinkProps> = ({ content, uri, target, acProcess, acId, onClick, consentModal }) => {
  const { Modal, openModal, closeModal } = useModal()
  const isDesktop = Boolean(window[ReapitConnectBrowserSession.GLOBAL_KEY])
  const closeConsentModal = consentModal ? closeModal : null

  if (!uri) return <>{content}</>

  if (!isDesktop) {
    const webUri = acProcess === AcProcessType.mail ? `mailto:${uri}` : uri
    const navigate = handleNavigate(target, webUri, closeConsentModal, isDesktop, onClick)
    return (
      <>
        <a
          onClick={handleOnClick(openModal, navigate, consentModal)}
          href={webUri}
          target={target}
          rel="noopener noreferrer"
        >
          {content}
        </a>
        <ConsentModal Modal={Modal} closeModal={closeModal} navigate={navigate} consentModal={consentModal} />
      </>
    )
  }

  const acUri = getAcUri(acProcess, uri, acId)
  const navigate = handleNavigate(target, acUri, closeConsentModal, isDesktop, onClick)

  return (
    <>
      <a onClick={handleOnClick(openModal, navigate, consentModal)} href={acUri}>
        {content}
      </a>
      <ConsentModal Modal={Modal} closeModal={closeModal} navigate={navigate} consentModal={consentModal} />
    </>
  )
}
