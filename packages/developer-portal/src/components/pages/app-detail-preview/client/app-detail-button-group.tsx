import * as React from 'react'
import { Button } from '@reapit/elements'

interface AppDetailButtonGroupProps {
  installedOn: string
  onInstallConfirmationModal: () => void
  onUninstallConfirmationModal: () => void
  isInstallBtnHidden: boolean
}

export const AppDetailButtonGroup: React.FC<AppDetailButtonGroupProps> = ({
  installedOn,
  onInstallConfirmationModal,
  onUninstallConfirmationModal,
  isInstallBtnHidden,
}) => {
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

  if (isInstallBtnHidden) {
    return null
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
