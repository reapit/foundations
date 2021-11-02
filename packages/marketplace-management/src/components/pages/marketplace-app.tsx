import React, { FC } from 'react'
import { AppDetailModel, DesktopIntegrationTypeModelPagedResult } from '@reapit/foundations-ts-definitions'
import AppToggleVisibilitySection from '../ui/apps/app-toggle-visibility-section'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useHistory, useParams } from 'react-router'
import useSWR from 'swr'
import { URLS } from '../../constants/api'
import AppPricingPermissionsSection from '../ui/apps/app-pricing-permissions-section'
import AppInstallationManager from '../ui/apps/app-installation-manager'
import {
  Loader,
  PersistantNotification,
  FlexContainer,
  SecondaryNavContainer,
  Title,
  Icon,
  elMb5,
  Subtitle,
  BodyText,
  Button,
  PageContainer,
  elHFull,
} from '@reapit/elements'
import { navigate } from '../ui/nav/nav'
import Routes from '../../constants/routes'
import { useOrgId } from '../../utils/use-org-id'
import { OrgIdSelect } from '../hocs/org-id-select'

export const handleLoadAppListing = (isDesktop: boolean, appId: string) => () => {
  const appListingUri = `${window.reapit.config.marketplaceUrl}/apps/${appId}`
  if (isDesktop) {
    return (window.location.href = `agencycloud://process/webpage?url=${appListingUri}`)
  }

  return window.open(appListingUri, '_blank')
}

const MarketplaceAppPage: FC = () => {
  const history = useHistory()
  const { connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const parms = useParams<{ appId: string }>()
  const { appId } = parms
  const {
    orgIdState: { orgName, orgClientId },
  } = useOrgId()

  const {
    data: app,
    error: appsError,
    mutate: reFetchApp,
  } = useSWR<AppDetailModel | undefined>(orgClientId ? `${URLS.APPS}/${appId}?clientId=${orgClientId}` : null)
  const { data: desktopIntegrationTypes, error: typesError } = useSWR<
    DesktopIntegrationTypeModelPagedResult | undefined
  >(`${URLS.DESKTOP_INTEGRATION_TYPES}`)

  if (appsError || typesError)
    return (
      <PersistantNotification intent="danger">
        Something went wrong fetching the app details. Please refresh this page.
      </PersistantNotification>
    )

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>Apps</Title>
        <Icon className={elMb5} icon="appInfographicAlt" iconSize="large" />
        <Subtitle>Marketplace Visibility and Installation Management</Subtitle>
        <BodyText hasGreyText>
          To set the visibility of app in the Marketplace or manage installations, use the various sections on this
          page.
        </BodyText>
        {!orgClientId && <OrgIdSelect />}
        <Button className={elMb5} type="button" intent="primary" onClick={navigate(history, Routes.MARKETPLACE)}>
          Back To Apps
        </Button>
        <Button
          className={elMb5}
          type="button"
          intent="critical"
          chevronRight
          onClick={handleLoadAppListing(connectIsDesktop, app?.id as string)}
        >
          View Listing
        </Button>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        {!orgClientId ? (
          <PersistantNotification isFullWidth isExpanded intent="secondary" isInline>
            No organisation selected. You need to select an organisation to view the app details.
          </PersistantNotification>
        ) : !app || !desktopIntegrationTypes ? (
          <Loader />
        ) : (
          <>
            <Title>
              {orgName} - {app?.name}
            </Title>
            <AppPricingPermissionsSection
              app={app as AppDetailModel}
              desktopIntegrationTypes={desktopIntegrationTypes?.data ?? []}
              isDesktop={connectIsDesktop}
            />
            <AppToggleVisibilitySection app={app as AppDetailModel} reFetchApp={reFetchApp} />
            <AppInstallationManager app={app as AppDetailModel} />
          </>
        )}
      </PageContainer>
    </FlexContainer>
  )
}

export default MarketplaceAppPage
