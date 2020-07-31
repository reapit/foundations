import React from 'react'
import { ModalV2, Content, Button } from '@reapit/elements'

export type NonAdminModalType = 'INSTALL' | 'UNINSTALL' | null

export type ModalDetails = {
  title: string
  content: string
}

export const getModalDetails = (type: NonAdminModalType, appTitle: string): ModalDetails => {
  if (type === 'INSTALL')
    return {
      title: `Installing ${appTitle}`,
      content: 'Your organisation settings prevent you from installing this app, please contact an Administrator.',
    }
  return {
    title: `Uninstalling ${appTitle}`,
    content: 'Your organisation settings prevent you from uninstalling this app, please contact an Administrator.',
  }
}

export type NonAdminModalProps = {
  type: NonAdminModalType
  appName: string
  onClose?: () => void
}

export const NonAdminModal = ({ type, appName, onClose }: NonAdminModalProps) => {
  if (!type) return null

  const details = getModalDetails(type, appName)
  const { title, content } = details
  return (
    <ModalV2
      title={title}
      visible
      isCentered
      closable={false}
      onClose={onClose}
      footer={<Button onClick={onClose}>Close</Button>}
    >
      <Content>
        <p>{content}</p>
      </Content>
    </ModalV2>
  )
}
export default NonAdminModal
