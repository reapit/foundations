import { Label, ToggleRadio } from '@reapit/elements'
import { UpdateActionNames, updateActions, useReapitUpdate } from '@reapit/use-reapit-data'
import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'

export const handleSetSupportNotification = (setSupportNotification: (data: any) => void) => (value) => {
  setSupportNotification({
    sendInternalInstallNotification: value.target.value === 'enable',
  })
}

export const ToggleSupportNotification: FC<{ appId: string; sendInternalInstallNotification: boolean }> = ({
  appId,
  sendInternalInstallNotification,
}) => {
  const [loading, , setSupportNotification] = useReapitUpdate({
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

  return (
    <>
      <Label>Support Notification</Label>
      <ToggleRadio
        name={`support-notification-${appId}`}
        options={[
          {
            id: 'enable-support-notification' + appId,
            isChecked: sendInternalInstallNotification,
            text: 'Enabled',
            value: 'enable',
          },
          {
            id: 'disable-support-notification' + appId,
            isChecked: !sendInternalInstallNotification,
            text: 'Disabled',
            value: 'disable',
          },
        ]}
        disabled={loading}
        onChange={handleSetSupportNotification(setSupportNotification)}
      />
    </>
  )
}
