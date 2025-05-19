import React, { FC, useCallback } from 'react'
import {
  AppDetailModel,
  CreateInstallationModel,
  DesktopIntegrationTypeModelPagedResult,
} from '@reapit/foundations-ts-definitions'
import { selectIsMarketplaceAdmin, selectIsOffGrouping, selectIsOrgAdmin } from '../../utils/auth'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { Button, ButtonGroup, elMb11, BodyText, elMb6, elMt6 } from '@reapit/elements'
import { AcProcessType, DesktopLink } from '@reapit/utils-react'
import { UpdateActionNames, updateActions, SendFunction, useReapitUpdate } from '@reapit/use-reapit-data'
import { AppDetailPermissionChip } from './__styles__'
import { trackEvent, trackEventHandler } from '../../core/analytics'
import { TrackingEvent } from '../../core/analytics-events'
import { cx } from '@linaria/core'

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
    appName?: string,
    appId?: string,
    clientId?: string | null,
    email?: string,
  ) =>
  async () => {
    if (appId && clientId && email) {
      trackEvent(TrackingEvent.ClickConfirnInstallation, true, { appName, clientId, email })

      const installation = await installApp({
        appId,
        clientId,
        approvedBy: email,
      })

      if (installation) {
        trackEvent(TrackingEvent.InstallationSuccess, true, { appName, clientId, email })

        refetchApp()
        closeModal()
        successOpenModal()
      } else {
        trackEvent(TrackingEvent.InstallationFailed, true, { appName, clientId, email })
      }
    }
  }

export const handleCloseModal =
  (closeModal: () => void, appName?: string, clientId?: string | null, email?: string) => () => {
    trackEvent(TrackingEvent.ClickCloseWithoutInstalling, true, { appName, clientId, email })

    closeModal()
  }

export const AppInstallModalContent: FC<AppInstallModalContentProps> = ({
  app,
  closeModal,
  successOpenModal,
  refetchApp,
  desktopIntegrationTypes,
}) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const clientId = connectSession?.loginIdentity.clientId
  const email = connectSession?.loginIdentity.email
  const offGroupName = connectSession?.loginIdentity.offGroupName ?? ''
  const isOrgAdmin = selectIsOrgAdmin(connectSession)
  const isMarketplaceAdmin = selectIsMarketplaceAdmin(connectSession)
  const isOffGrouping = selectIsOffGrouping(connectSession)

  const { name, id, scopes = [], isFree, pricingUrl, developer, desktopIntegrationTypeIds, isDirectApi } = app ?? {}

  const [appInstalling, , installApp] = useReapitUpdate<CreateInstallationModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.installApp],
    method: 'POST',
  })

  const closeWithoutInstalling = useCallback(handleCloseModal(closeModal, name, clientId, email), [connectSession, app])
  const confirmInstall = useCallback(
    handleInstall(installApp, refetchApp, closeModal, successOpenModal, name, id, clientId, email),
    [connectSession, app, installApp],
  )
  const trackReadDocs = useCallback(trackEventHandler(TrackingEvent.ClickReadDocs, true), [])
  const trackNavigateMmApp = useCallback(trackEventHandler(TrackingEvent.ClickReadDocs, true), [])
  const trackViewPricing = useCallback(trackEventHandler(TrackingEvent.ClickViewPricing, true), [])

  const userDesktopIntegrationTypes = desktopIntegrationTypes?.data?.filter(
    ({ id }) => id && desktopIntegrationTypeIds?.includes(id),
  )

  return (
    <>
      <div className={elMb11}>
        {isOffGrouping && isOrgAdmin ? (
          <BodyText hasGreyText>
            As an organisation admin, you have control over {isDirectApi ? 'enabling' : 'installation'} of &lsquo;{name}
            &rsquo; for either your Office Group or for <b>all</b> Users and Offices within your Organisation. To do
            this, you need to visit the{' '}
            <DesktopLink
              onClick={trackNavigateMmApp}
              uri={process.env.reapitConnectManagementUri}
              acProcess={AcProcessType.web}
              target="_blank"
              content="Reapit Connect Management App."
            />
          </BodyText>
        ) : isOffGrouping && isMarketplaceAdmin ? (
          <BodyText hasGreyText>
            You are about to {isDirectApi ? 'enable' : 'install'} &lsquo;{name}&rsquo; for your Office Group{' '}
            {offGroupName}
          </BodyText>
        ) : (
          <BodyText hasGreyText>
            You are about to {isDirectApi ? 'enable' : 'install'} &lsquo;{name}&rsquo; for <b>all</b> Users and Offices
            within your Organisation.
          </BodyText>
        )}
        {userDesktopIntegrationTypes?.length ? (
          <>
            <BodyText>Desktop Integration</BodyText>
            <BodyText hasGreyText>
              This app requires the following Desktop Integration. Some integration types may replace or change certain
              behaviours within Agency Cloud.
            </BodyText>
            <div className={elMb6}>
              {userDesktopIntegrationTypes.map((integration) => (
                <AppDetailPermissionChip key={integration.name}>
                  {integration?.description ?? ''}
                </AppDetailPermissionChip>
              ))}
            </div>
            <BodyText hasGreyText>
              For more information regarding Desktop Integration types, please{' '}
              <DesktopLink
                onClick={trackReadDocs}
                uri="https://marketplace-documentation.reapit.cloud/integration-types"
                acProcess={AcProcessType.web}
                target="_blank"
                content="click here"
              />
              .
            </BodyText>
          </>
        ) : null}
        <BodyText>Pricing Information</BodyText>
        {isFree ? (
          <BodyText hasGreyText>
            {developer} have specified there is no cost for using this {isDirectApi ? 'integration' : 'app'}.
          </BodyText>
        ) : pricingUrl ? (
          <>
            <BodyText hasGreyText>
              {developer} have specified that there is a cost for using this {isDirectApi ? 'integration' : 'app'},
              please{' '}
              <DesktopLink
                onClick={trackViewPricing}
                uri={pricingUrl}
                acProcess={AcProcessType.web}
                target="_blank"
                content="click here"
              />{' '}
              to view their pricing information. You will be billed directly by {developer}.
            </BodyText>
            {developer !== 'Reapit Ltd' && (
              <BodyText hasGreyText>
                You will not be charged by Reapit Ltd for any costs associated with using this{' '}
                {isDirectApi ? 'integration' : 'app'}.
              </BodyText>
            )}
          </>
        ) : (
          <BodyText hasGreyText>
            There may be a cost associated to using this {isDirectApi ? 'integration' : 'app'}. However, this
            information has not yet been provided by {developer}. Please contact {developer} directly for information
            about pricing.
          </BodyText>
        )}
        <>
          <BodyText>Data Permissions</BodyText>
          <BodyText hasGreyText>
            By {isDirectApi ? 'enabling' : 'installing'} this app, you are granting the following permissions to your
            data:
          </BodyText>
          <BodyText hasGreyText>
            Information about your organisation and the names/email addresses of your users
          </BodyText>
          {scopes?.map(({ name, description }) => (
            <AppDetailPermissionChip key={name}>{description ?? ''}</AppDetailPermissionChip>
          ))}
          <BodyText className={cx(elMt6)} hasGreyText>
            For more detailed information about App permissions, please{' '}
            <DesktopLink
              uri="https://foundations-documentation.reapit.cloud/platform-glossary/permissions"
              acProcess={AcProcessType.web}
              target="_blank"
              content="https://foundations-documentation.reapit.cloud/platform-glossary/permissions"
            />
          </BodyText>
        </>
      </div>
      <ButtonGroup alignment="center">
        <Button intent="default" onClick={closeWithoutInstalling} fixedWidth>
          Cancel
        </Button>
        <Button
          loading={appInstalling}
          disabled={appInstalling}
          type="button"
          intent="primary"
          onClick={confirmInstall}
        >
          Confirm
        </Button>
      </ButtonGroup>
    </>
  )
}
