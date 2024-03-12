import { BodyText, Button, ButtonGroup, useModal } from '@reapit/elements'
import { UpdateActionNames, updateActions, useReapitUpdate } from '@reapit/use-reapit-data'
import React, { FC, useEffect } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'

export const handleSetSupportNotification = (setSupportNotification: (data: any) => void) => () => {
  setSupportNotification({
    sendInternalInstallNotification: true,
  })
}

export const ToggleSupportNotification: FC<{ appId: string; hasReadAccess: boolean }> = ({ appId, hasReadAccess }) => {
  const { Modal, openModal, closeModal } = useModal()

  const [loading, , setSupportNotification, done] = useReapitUpdate({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.updateApp],
    method: 'PUT',
    uriParams: {
      appId,
    },
    headers: {
      ['Api-Version']: 'latest',
    },
  })

  useEffect(() => {
    if (done) closeModal()
  }, [done])

  return (
    <>
      <Button onClick={openModal} intent="primary" disabled={hasReadAccess}>
        Toggle Support Notification
      </Button>

      <Modal title={'Toggle Support Notifications'}>
        <BodyText>This will enable the support notifications</BodyText>
        <ButtonGroup alignment="center">
          <Button intent="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            intent="primary"
            disabled={loading}
            loading={loading}
            onClick={handleSetSupportNotification(setSupportNotification)}
          >
            Confirm
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  )
}
