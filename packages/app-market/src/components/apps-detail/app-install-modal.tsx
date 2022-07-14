import React, { FC } from 'react'
import {
  AppDetailModel,
  CreateInstallationModel,
  DesktopIntegrationTypeModelPagedResult,
} from '@reapit/foundations-ts-definitions'
import { selectIsMarketplaceAdmin, selectIsOffGrouping, selectIsOrgAdmin } from '../../utils/auth'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { BodyText, Button, ButtonGroup, Col, elMb11, Grid, SmallText } from '@reapit/elements'
import { SendFunction, useReapitUpdate } from '@reapit/utils-react'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'
import { AppDetailPermissionChip } from './__styles__'

export const DESKTOP_REFRESH_URL = 'agencycloud://apps/refresh'

export type AppInstallModalContentProps = {
  app?: AppDetailModel
  closeModal: () => void
  successOpenModal: () => void
  refetchApp: () => void
  desktopIntegrationTypes: DesktopIntegrationTypeModelPagedResult | null
}

export const handleInstall =
  (
    installApp: SendFunction<CreateInstallationModel, boolean>,
    refetchApp: () => void,
    closeModal: () => void,
    successOpenModal: () => void,
    appId?: string,
    clientId?: string | null,
    email?: string,
  ) =>
  async () => {
    if (appId && clientId && email) {
      const installation = await installApp({
        appId,
        clientId,
        approvedBy: email,
      })

      if (installation) {
        refetchApp()
        closeModal()
        successOpenModal()
      }
    }
  }

export const AppInstallModalContent: FC<AppInstallModalContentProps> = ({
  app,
  closeModal,
  successOpenModal,
  refetchApp,
  desktopIntegrationTypes,
}) => {
  const { connectSession, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const clientId = connectSession?.loginIdentity.clientId
  const email = connectSession?.loginIdentity.email
  const offGroupName = connectSession?.loginIdentity.offGroupName ?? ''
  const isOrgAdmin = selectIsOrgAdmin(connectSession)
  const isMarketplaceAdmin = selectIsMarketplaceAdmin(connectSession)
  const isOffGrouping = selectIsOffGrouping(connectSession)

  const { name, id, scopes = [], isFree, pricingUrl, developer, desktopIntegrationTypeIds, isDirectApi } = app ?? {}

  const [appInstalling, , installApp] = useReapitUpdate<CreateInstallationModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.installApp],
    method: 'POST',
  })

  const userDesktopIntegrationTypes = desktopIntegrationTypes?.data?.filter(
    ({ id }) => id && desktopIntegrationTypeIds?.includes(id),
  )

  return (
    <>
      <div className={elMb11}>
        {isOffGrouping && isOrgAdmin ? (
          <SmallText hasGreyText>
            As an organisation admin, you have control over {isDirectApi ? 'enabling' : 'installation'} of &lsquo;{name}
            &rsquo; for either your Office Group or for <b>all</b> Users and Offices within your Organisation. To do
            this, you need to visit the{' '}
            <a
              href={
                connectIsDesktop
                  ? `agencycloud://process/webpage?url=${window.reapit.config.reapitConnectManagementUri}`
                  : window.reapit.config.reapitConnectManagementUri
              }
            >
              Reapit Connect Management App.
            </a>
          </SmallText>
        ) : isOffGrouping && isMarketplaceAdmin ? (
          <SmallText hasGreyText>
            You are about to {isDirectApi ? 'enable' : 'install'} &lsquo;{name}&rsquo; for your Office Group{' '}
            {offGroupName}
          </SmallText>
        ) : (
          <SmallText hasGreyText>
            You are about to {isDirectApi ? 'enable' : 'install'} &lsquo;{name}&rsquo; for <b>all</b> Users and Offices
            within your Organisation.
          </SmallText>
        )}
        {userDesktopIntegrationTypes?.length ? (
          <>
            <BodyText>Desktop Integration</BodyText>
            <SmallText hasGreyText>
              This app requires the following Desktop Integration. Some integration types may replace or change certain
              behaviours within Agency Cloud.
            </SmallText>
            <ul className="ml-4">
              {userDesktopIntegrationTypes.map((integration) => (
                <li key={integration.name}>{integration?.description ?? ''}</li>
              ))}
            </ul>
            <SmallText hasGreyText>
              For more information regarding Desktop Integration types, please{' '}
              {connectIsDesktop ? (
                <a
                  href={
                    'agencycloud://process/webpage?url=https://marketplace-documentation.reapit.cloud/integration-types'
                  }
                >
                  click here
                </a>
              ) : (
                <a
                  href="https://marketplace-documentation.reapit.cloud/integration-types"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  click here
                </a>
              )}
              .
            </SmallText>
          </>
        ) : null}
        <BodyText>Pricing Information</BodyText>
        {isFree ? (
          <SmallText hasGreyText>
            {developer} have specified there is no cost for using this {isDirectApi ? 'integration' : 'app'}.
          </SmallText>
        ) : pricingUrl ? (
          <>
            <SmallText hasGreyText>
              {developer} have specified that there is a cost for using this {isDirectApi ? 'integration' : 'app'},
              please{' '}
              {connectIsDesktop ? (
                <a href={`agencycloud://process/webpage?url=${pricingUrl}`}>click here</a>
              ) : (
                <a href={pricingUrl} target="_blank" rel="noopener noreferrer">
                  click here
                </a>
              )}{' '}
              to view their pricing information. You will be billed directly by {developer}.
            </SmallText>
            {developer !== 'Reapit Ltd' && (
              <SmallText hasGreyText>
                You will not be charged by Reapit Ltd for any costs associated with using this{' '}
                {isDirectApi ? 'integration' : 'app'}.
              </SmallText>
            )}
          </>
        ) : (
          <SmallText hasGreyText>
            There may be a cost associated to using this {isDirectApi ? 'integration' : 'app'}. However, this
            information has not yet been provided by {developer}. Please contact {developer} directly for information
            about pricing.
          </SmallText>
        )}
        <>
          <BodyText>Data Permissions</BodyText>
          <SmallText hasGreyText>
            By {isDirectApi ? 'enabling' : 'installing'} this app, you are granting the following permissions to your
            data:
          </SmallText>
          <SmallText hasGreyText>
            Information about your organisation and the names/email addresses of your users
          </SmallText>
          {Boolean(scopes.length) && (
            <Grid>
              {scopes.map(({ name, description }) => (
                <Col key={name}>
                  <AppDetailPermissionChip>{description ?? ''}</AppDetailPermissionChip>
                </Col>
              ))}
            </Grid>
          )}
        </>
      </div>
      <ButtonGroup alignment="center">
        <Button intent="low" onClick={closeModal} fixedWidth>
          Cancel
        </Button>
        <Button
          loading={appInstalling}
          disabled={appInstalling}
          type="button"
          intent="primary"
          onClick={handleInstall(installApp, refetchApp, closeModal, successOpenModal, id, clientId, email)}
        >
          Confirm
        </Button>
      </ButtonGroup>
    </>
  )
}
