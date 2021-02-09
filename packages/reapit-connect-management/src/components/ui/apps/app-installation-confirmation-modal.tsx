import React from 'react'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { Modal, Button, PortalProvider, Content } from '@reapit/elements'
import { WHOLE_ORG, SPECIFIC_OFFICE_GROUPS } from './app-installation-manager'

export interface AppInstallationConfirmationModalProps {
  app: AppSummaryModel
  visible: boolean
  installFor: string[]
  uninstallFor: string[]
  appInstallationType: string
  onConfirm: () => void
  onClose: () => void
}

const AppInstallationConfirmationModal: React.FC<AppInstallationConfirmationModalProps> = ({
  app,
  visible,
  installFor,
  uninstallFor,
  appInstallationType,
  onConfirm,
  onClose,
}: AppInstallationConfirmationModalProps) => {
  const wholeOrgText = (
    <p>
      By confirming this installation, you are granting this app access to all data inside of your organisation and all
      users and offices will have access to this app inside of the Marketplace.
    </p>
  )

  const specificOfficeGroupsText = (
    <>
      <p>Please confirm that you wish to action the following with this app:</p>
      {!!installFor.length && (
        <p>
          Installation for {installFor.length} office{installFor.length > 1 && 's'}
        </p>
      )}
      {!!uninstallFor.length && (
        <p>
          Uninstallation for {uninstallFor.length} office{uninstallFor.length > 1 && 's'}
        </p>
      )}
    </>
  )

  return (
    <PortalProvider>
      <Modal
        visible={visible}
        afterClose={onClose}
        title={`${app.name} App Confirmation`}
        footerItems={
          <>
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="button" onClick={onConfirm}>
              Confirm
            </Button>
          </>
        }
      >
        <Content>
          {appInstallationType === WHOLE_ORG && wholeOrgText}
          {appInstallationType === SPECIFIC_OFFICE_GROUPS && specificOfficeGroupsText}
          <p>
            Before you confirm, please check to ensure you have reviewed and agree with the Desktop Types (if
            applicable), Pricing Information and Data Permissions.
          </p>
          <p>If you are uncertain, please cancel and take a look at information located on the app listing.</p>
        </Content>
      </Modal>
    </PortalProvider>
  )
}

export default AppInstallationConfirmationModal
