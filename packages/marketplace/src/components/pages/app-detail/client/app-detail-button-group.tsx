import * as React from 'react'
import { Button } from '@reapit/elements'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { selectSandboxDeveloper } from '@/selector/auth'
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
  const { developerId, installedOn } = appDetailData
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const sandboxDeveloper = selectSandboxDeveloper(connectSession)

  if (sandboxDeveloper && sandboxDeveloper !== developerId) {
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
