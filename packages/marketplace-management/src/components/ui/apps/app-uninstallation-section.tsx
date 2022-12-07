import React, { FC } from 'react'
import { InstallationModel } from '@reapit/foundations-ts-definitions'
import {
  getInstallationsForOfficeGroups,
  getInstallationsForWholeOrg,
  getClientIdFirstPart,
} from './app-installation-manager'
import { BodyText, Button, ButtonGroup, elMb11, Subtitle } from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { ReferralsDisplay } from './app-referrals-display'

export interface AppUninstallationSectionProps {
  installations: InstallationModel[]
  clientId: string | null
  setShowConfirmModal: (state: boolean) => void
  setPerformCompleteUninstall: (state: boolean) => void
}

const AppUninstallationSection: FC<AppUninstallationSectionProps> = ({
  installations,
  clientId,
  setShowConfirmModal,
  setPerformCompleteUninstall,
}: AppUninstallationSectionProps) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const email = connectSession?.loginIdentity.email ?? ''
  const clientIdFirstPart = getClientIdFirstPart(clientId)
  const wholeOrgInstallations = getInstallationsForWholeOrg(installations, clientIdFirstPart, email)
  const officeGroupInstallations = getInstallationsForOfficeGroups(installations, clientIdFirstPart)

  const noCurrentInstallations = wholeOrgInstallations.length === 0 && officeGroupInstallations.length == 0

  const currentInstallText =
    wholeOrgInstallations.length > 0
      ? 'your whole orgainsation'
      : `${officeGroupInstallations.length} group${officeGroupInstallations.length !== 1 ? 's' : ''}`

  return (
    <div className={elMb11}>
      <Subtitle>Current Installations</Subtitle>
      {!noCurrentInstallations && (
        <>
          <ReferralsDisplay hasCurrentInstallations={!noCurrentInstallations} installations={installations} />
          <BodyText hasGreyText>
            This app is currently installed for {currentInstallText}. Please click ‘Uninstall’ to terminate the
            installation.
          </BodyText>
          <ButtonGroup alignment="right">
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
          </ButtonGroup>
        </>
      )}
      {noCurrentInstallations && (
        <BodyText hasGreyText>
          This app is not currently installed. You can either install for your organisation or specific office groups in
          the section below.
        </BodyText>
      )}
    </div>
  )
}

export default AppUninstallationSection
