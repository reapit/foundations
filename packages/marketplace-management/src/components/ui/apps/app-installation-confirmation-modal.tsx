import React, { FC, useState } from 'react'
import {
  AppDetailModel,
  BatchUpdateInstallationMetadataModel,
  CreateInstallationMetadataModel,
} from '@reapit/foundations-ts-definitions'
import { WHOLE_ORG, SPECIFIC_OFFICE_GROUPS, InstallTypes } from './app-installation-manager'
import { BodyText, Button, ButtonGroup } from '@reapit/elements'
import { ReferralsConfirmationSelection } from './app-referrals-confirm'

export type MetaDataType = (CreateInstallationMetadataModel | BatchUpdateInstallationMetadataModel)[]

export interface AppInstallationConfirmationModalProps {
  app: AppDetailModel
  installFor: string[]
  uninstallFor: string[]
  appInstallationType: InstallTypes
  onConfirm: (metadata: MetaDataType) => void
  onClose: () => void
  performCompleteUninstall: boolean
}

const AppInstallationConfirmationModal: FC<AppInstallationConfirmationModalProps> = ({
  app,
  installFor,
  uninstallFor,
  appInstallationType,
  onConfirm,
  onClose,
  performCompleteUninstall,
}: AppInstallationConfirmationModalProps) => {
  const [metadata, setMetadata] = useState<MetaDataType | null>(null)
  const uninstallText = (
    <BodyText hasGreyText>
      Are you sure you wish to uninstall {app.name}? This action will uninstall the app for <b>all</b> members of your
      organisation, and for all office groups.
    </BodyText>
  )

  const wholeOrgInstallText = (
    <BodyText hasGreyText>
      By confirming this installation, you are granting this app access to all data inside of your organisation and all
      users and offices will have access to this app inside of the AppMarket.
    </BodyText>
  )

  const specificOfficeGroupsText = (
    <>
      <BodyText hasGreyText>Please confirm that you wish to action the following with this app:</BodyText>
      {!!installFor.length && (
        <BodyText hasGreyText>
          Installation for {installFor.length} office group{installFor.length > 1 && 's'}
        </BodyText>
      )}
      {!!uninstallFor.length && (
        <BodyText hasGreyText>
          Uninstallation for {uninstallFor.length} office group{uninstallFor.length > 1 && 's'}
        </BodyText>
      )}
    </>
  )

  return (
    <>
      {performCompleteUninstall && uninstallText}
      {!performCompleteUninstall && appInstallationType === WHOLE_ORG && wholeOrgInstallText}
      {!performCompleteUninstall && appInstallationType === SPECIFIC_OFFICE_GROUPS && specificOfficeGroupsText}
      <ReferralsConfirmationSelection app={app} metadata={metadata} setMetadata={setMetadata} />
      {!performCompleteUninstall && (
        <>
          <BodyText hasGreyText>
            Before you confirm, please check to ensure you have reviewed and agree with the Desktop Types (if
            applicable), Pricing Information and Data Permissions.
          </BodyText>
          <BodyText hasGreyText>
            If you are uncertain, please cancel and take a look at information located on the app listing.
          </BodyText>
        </>
      )}
      <ButtonGroup alignment="right">
        <Button intent="secondary" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button
          intent="primary"
          type="button"
          disabled={Boolean(metadata && !metadata.length)}
          onClick={() => onConfirm(metadata ?? [])}
        >
          Confirm
        </Button>
      </ButtonGroup>
    </>
  )
}

export default AppInstallationConfirmationModal
