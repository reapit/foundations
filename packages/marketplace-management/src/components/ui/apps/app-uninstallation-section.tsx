import React from 'react'
import { InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import {
  getInstallationsForOfficeGroups,
  getInstallationsForWholeOrg,
  getClientIdFirstPart,
} from './app-installation-manager'
import { BodyText, Button, FlexContainer, Subtitle } from '@reapit/elements'

export interface AppUninstallationSectionProps {
  installations: InstallationModelPagedResult | undefined
  clientId: string | null
  setShowConfirmModal: (state: boolean) => void
  setPerformCompleteUninstall: (state: boolean) => void
}

const AppUninstallationSection: React.FC<AppUninstallationSectionProps> = ({
  installations,
  clientId,
  setShowConfirmModal,
  setPerformCompleteUninstall,
}: AppUninstallationSectionProps) => {
  const clientIdFirstPart = getClientIdFirstPart(clientId)

  const wholeOrgInstallations = getInstallationsForWholeOrg(installations, clientIdFirstPart)
  const officeGroupInstallations = getInstallationsForOfficeGroups(installations, clientIdFirstPart)

  const noCurrentInstallations = wholeOrgInstallations.length === 0 && officeGroupInstallations.length == 0

  const currentInstallText =
    wholeOrgInstallations.length > 0
      ? 'your whole orgainsation'
      : `${officeGroupInstallations.length} group${officeGroupInstallations.length !== 1 ? 's' : ''}`

  return (
    <>
      <FlexContainer>
        <Subtitle>Current Installations</Subtitle>
        <Button
          intent="primary"
          disabled={noCurrentInstallations}
          loading={false}
          onClick={() => {
            setPerformCompleteUninstall(true)
            setShowConfirmModal(true)
          }}
        >
          Uninstall
        </Button>
      </FlexContainer>
      {!noCurrentInstallations && (
        <BodyText>
          This app is currently installed for {currentInstallText}. By clicking this button you will uninstall for all
          users and offices.
        </BodyText>
      )}
      {noCurrentInstallations && (
        <BodyText>
          This app is not currently installed. You can either install for your organisation or specific office groups in
          the section below.
        </BodyText>
      )}
    </>
  )
}

export default AppUninstallationSection
