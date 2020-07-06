import * as React from 'react'
import { Button } from '@reapit/elements'

interface ClientAppDetailButtonGroupProps {
  installedOn: string
  onInstallConfirmationModal: () => void
  onUninstallConfirmationModal: () => void
  isInstallBtnHidden: boolean
}

export const ClientAppDetailButtonGroup: React.FC<ClientAppDetailButtonGroupProps> = ({
  installedOn,
  onInstallConfirmationModal,
  onUninstallConfirmationModal,
  isInstallBtnHidden,
}) => {
  return (
    <>
      {installedOn ? (
        <Button
          onClick={onUninstallConfirmationModal}
          dataTest="detail-modal-uninstall-button"
          type="button"
          variant="primary"
          className="ml-0"
        >
          Uninstall App
        </Button>
      ) : (
        isInstallBtnHidden || (
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
      )}
    </>
  )
}
