import * as React from 'react'
import { Button } from '@reapit/elements'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { selectClientId, selectSandboxDeveloper } from '@/selector/auth'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'

interface AppDetailButtonGroupProps {
  appDetailData: AppDetailModel
  onInstallConfirmationModal: () => void
  onUninstallConfirmationModal: () => void
}

export const AppDetailButtonGroup: React.FC<AppDetailButtonGroupProps> = ({
  appDetailData,
  onInstallConfirmationModal,
  onUninstallConfirmationModal,
}) => {
  const { developerId, installedOn, isListed } = appDetailData
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const sandboxDeveloper = selectSandboxDeveloper(connectSession)
  const clientId = selectClientId(connectSession)
  const notListedSandbox = !isListed && clientId !== 'SBOX'
  const notSandboxDevsApp = Boolean(sandboxDeveloper) && sandboxDeveloper !== developerId

  if (notListedSandbox || notSandboxDevsApp) {
    return null
  }

  if (installedOn) {
    return (
      <Button
        onClick={onUninstallConfirmationModal}
        dataTest="detail-modal-uninstall-button"
        type="button"
        variant="primary"
        className="ml-0"
      >
        Uninstall App
      </Button>
    )
  }

  return (
    <Button
      dataTest="detail-modal-install-button"
      type="button"
      variant="primary"
      className="ml-0"
      onClick={onInstallConfirmationModal}
    >
      Install App
    </Button>
  )
}
