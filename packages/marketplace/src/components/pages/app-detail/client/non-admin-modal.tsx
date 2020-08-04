import React from 'react'
import { ModalV2, Content, Button } from '@reapit/elements'

export type NonAdminInstallModalProps = {
  visible: boolean
  title: string
  onClose?: () => void
}

export const NonAdminInstallModal = ({ title, visible, onClose }: NonAdminInstallModalProps) => {
  return (
    <ModalV2
      title={`Installing ${title}`}
      visible={visible}
      isCentered
      closable={false}
      onClose={onClose}
      footer={<Button onClick={onClose}>Close</Button>}
    >
      <Content>
        <p>Your organisation settings prevent you from installing this app, please contact an Administrator.</p>
      </Content>
    </ModalV2>
  )
}

export type NonAdminUninstallModalProps = {
  title: string
  visible: boolean
  onClose?: () => void
}

export const NonAdminUninstallModal = ({ title, visible, onClose }: NonAdminUninstallModalProps) => {
  return (
    <ModalV2
      title={`Uninstalling ${title}`}
      visible={visible}
      isCentered
      closable={false}
      onClose={onClose}
      footer={<Button onClick={onClose}>Close</Button>}
    >
      <Content>
        <p>Your organisation settings prevent you from uninstalling this app, please contact an Administrator.</p>
      </Content>
    </ModalV2>
  )
}
export default { NonAdminInstallModal, NonAdminUninstallModal }
