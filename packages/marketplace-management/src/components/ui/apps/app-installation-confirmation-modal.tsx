import React from 'react'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { Modal, Button, PortalProvider, Content, ButtonGroup } from '@reapit/elements'
import { WHOLE_ORG, SPECIFIC_OFFICE_GROUPS, InstallTypes } from './app-installation-manager'

export interface AppInstallationConfirmationModalProps {
  app: AppSummaryModel
  visible: boolean
  installFor: string[]
  uninstallFor: string[]
  appInstallationType: InstallTypes
  onConfirm: () => void
  onClose: () => void
  performCompleteUninstall: boolean
}

const AppInstallationConfirmationModal: React.FC<AppInstallationConfirmationModalProps> = ({
  app,
  visible,
  installFor,
  uninstallFor,
  appInstallationType,
  onConfirm,
  onClose,
  performCompleteUninstall,
}: AppInstallationConfirmationModalProps) => {
  const uninstallText = (
    <p>
      Are you sure you wish to uninstall {app.name}? This action will uninstall the app for <b>all</b> members of your
      organisation, and for all office groups.
    </p>
  )

  const wholeOrgInstallText = (
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
          Installation for {installFor.length} office group{installFor.length > 1 && 's'}
        </p>
      )}
      {!!uninstallFor.length && (
        <p>
          Uninstallation for {uninstallFor.length} office group{uninstallFor.length > 1 && 's'}
        </p>
      )}
    </>
  )

  return (
    <PortalProvider>
      <Modal
        visible={visible}
        afterClose={onClose}
        title={`${app.name} App ${performCompleteUninstall ? 'Uninstall' : 'Install'}`}
        footerItems={
          <ButtonGroup hasSpacing isCentered>
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="button" onClick={onConfirm}>
              Confirm
            </Button>
          </ButtonGroup>
        }
      >
        <Content>
          {performCompleteUninstall && uninstallText}
          {!performCompleteUninstall && appInstallationType === WHOLE_ORG && wholeOrgInstallText}
          {!performCompleteUninstall && appInstallationType === SPECIFIC_OFFICE_GROUPS && specificOfficeGroupsText}
          {!performCompleteUninstall && (
            <>
              <p>
                Before you confirm, please check to ensure you have reviewed and agree with the Desktop Types (if
                applicable), Pricing Information and Data Permissions.
              </p>
              <p>If you are uncertain, please cancel and take a look at information located on the app listing.</p>
            </>
          )}
        </Content>
      </Modal>
    </PortalProvider>
  )
}

export default AppInstallationConfirmationModal
