import React from 'react'
import { AppDetailModel, DesktopIntegrationTypeModelPagedResult } from '@reapit/foundations-ts-definitions'
import { Button, FadeIn, H3, Helper, Loader, Section } from '@reapit/elements'
import AppToggleVisibilitySection from '../ui/apps/app-toggle-visibility-section'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useParams } from 'react-router'
import useSWR from 'swr'
import { URLS } from '../../constants/api'
import AppPricingPermissionsSection from '../ui/apps/app-pricing-permissions-section'

export const handleLoadAppListing = (isDesktop: boolean, appId: string) => () => {
  const appListingUri = `${window.reapit.config.marketplaceUrl}/apps/${appId}`
  if (isDesktop) {
    return (window.location.href = `agencycloud://process/webpage?url=${appListingUri}`)
  }

  return window.open(appListingUri, '_blank')
}

const MarketplaceAppPage: React.FC = () => {
  const { connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const parms = useParams<{ appId: string }>()
  const { appId } = parms

  const { data: app, error: appsError } = useSWR<AppDetailModel | undefined>(`${URLS.APPS}/${appId}`)
  const { data: desktopIntegrationTypes, error: typesError } = useSWR<
    DesktopIntegrationTypeModelPagedResult | undefined
  >(`${URLS.DESKTOP_INTEGRATION_TYPES}`)

  if (!app || !desktopIntegrationTypes) return <Loader />

  if (appsError || typesError)
    return <Helper variant="warning">Something went wrong fetching the app details. Please refresh this page.</Helper>

  return (
    <FadeIn>
      <Section>
        <div className="justify-between flex items-center">
          <H3 className="mb-0">{app.name}</H3>
          <Button type="button" onClick={handleLoadAppListing(connectIsDesktop, app.id as string)}>
            View Marketplace Listing
          </Button>
        </div>
      </Section>
      <AppPricingPermissionsSection
        app={app}
        desktopIntegrationTypes={desktopIntegrationTypes.data ?? []}
        isDesktop={connectIsDesktop}
      />
      <AppToggleVisibilitySection app={app} />
    </FadeIn>
  )
}

export default MarketplaceAppPage
