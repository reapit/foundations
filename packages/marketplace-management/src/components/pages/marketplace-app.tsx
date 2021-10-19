import React, { FC } from 'react'
import { AppDetailModel, DesktopIntegrationTypeModelPagedResult } from '@reapit/foundations-ts-definitions'
import AppToggleVisibilitySection from '../ui/apps/app-toggle-visibility-section'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useParams } from 'react-router'
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
import { FadeIn } from '@reapit/elements-legacy'

export const handleLoadAppListing = (isDesktop: boolean, appId: string) => () => {
  const appListingUri = `${window.reapit.config.marketplaceUrl}/apps/${appId}`
  if (isDesktop) {
    return (window.location.href = `agencycloud://process/webpage?url=${appListingUri}`)
  }

  return window.open(appListingUri, '_blank')
}

const MarketplaceAppPage: FC = () => {
  const { connectIsDesktop, connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const parms = useParams<{ appId: string }>()
  const { appId } = parms
  const clientId = connectSession?.loginIdentity?.clientId

  const {
    data: app,
    error: appsError,
    mutate: reFetchApp,
  } = useSWR<AppDetailModel | undefined>(clientId ? `${URLS.APPS}/${appId}?clientId=${clientId}` : null)
  const { data: desktopIntegrationTypes, error: typesError } = useSWR<
    DesktopIntegrationTypeModelPagedResult | undefined
  >(`${URLS.DESKTOP_INTEGRATION_TYPES}`)

  if (!app || !desktopIntegrationTypes) return <Loader />

  if (appsError || typesError)
    return (
      <PersistantNotification intent="danger">
        Something went wrong fetching the app details. Please refresh this page.
      </PersistantNotification>
    )

  return (
    <FadeIn>
      <FlexContainer isFlexAuto>
        <SecondaryNavContainer>
          <Title>Apps</Title>
          <Icon className={elMb5} icon="appInfographicAlt" iconSize="large" />
          <Subtitle>Marketplace Visibility and Installation Management</Subtitle>
          <BodyText hasGreyText>
            To set the visibility of app in the Marketplace or manage installations, for your organisation or
            specifioffice groups, please select an app from the list below:
          </BodyText>
          <Button
            type="button"
            intent="critical"
            chevronLeft
            onClick={handleLoadAppListing(connectIsDesktop, app.id as string)}
          >
            View Listing
          </Button>
        </SecondaryNavContainer>
        <PageContainer className={elHFull}>
          <Title>{app.name}</Title>
          <AppPricingPermissionsSection
            app={app}
            desktopIntegrationTypes={desktopIntegrationTypes.data ?? []}
            isDesktop={connectIsDesktop}
          />
          <AppToggleVisibilitySection app={app} reFetchApp={reFetchApp} />
          <AppInstallationManager app={app} />
        </PageContainer>
      </FlexContainer>
      )
    </FadeIn>
  )
}

export default MarketplaceAppPage
