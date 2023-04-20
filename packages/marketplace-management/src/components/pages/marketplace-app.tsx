import React, { FC } from 'react'
import { AppDetailModel, DesktopIntegrationTypeModelPagedResult } from '@reapit/foundations-ts-definitions'
import AppToggleVisibilitySection from '../ui/apps/app-toggle-visibility-section'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useNavigate, useParams } from 'react-router'
import useSWR from 'swr'
import { URLS } from '../../constants/api'
import AppPricingPermissionsSection from '../ui/apps/app-pricing-permissions-section'
import AppInstallationManager from '../ui/apps/app-installation-manager'
import {
  Loader,
  PersistentNotification,
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
  ButtonGroup,
  useMediaQuery,
} from '@reapit/elements'
import { navigateRoute } from '../ui/nav/nav'
import Routes from '../../constants/routes'
import { useOrgId } from '../../utils/use-org-id'
import { OrgIdSelect } from '../hocs/org-id-select'

export const handleLoadAppListing = (isDesktop: boolean, appId: string) => () => {
  const appListingUri = `${process.env.marketplaceUrl}/apps/${appId}`
  if (isDesktop) {
    return (window.location.href = `agencycloud://process/webpage?url=${appListingUri}`)
  }

  return window.open(appListingUri, '_blank')
}

const MarketplaceAppPage: FC = () => {
  const navigate = useNavigate()
  const { connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const { isMobile } = useMediaQuery()
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
      <PersistentNotification intent="danger">
        Something went wrong fetching the app details. Please refresh this page.
      </PersistentNotification>
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
        <Button className={elMb5} type="button" intent="primary" onClick={navigateRoute(navigate, Routes.MARKETPLACE)}>
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
          <PersistentNotification isFullWidth isExpanded intent="secondary" isInline>
            No organisation selected. You need to select an organisation to view the app details.
          </PersistentNotification>
        ) : !app || !desktopIntegrationTypes ? (
          <Loader />
        ) : (
          <>
            <FlexContainer isFlexJustifyBetween>
              <Title>
                {orgName} - {app?.name}
              </Title>
              {isMobile && (
                <ButtonGroup alignment="right">
                  <Button
                    className={elMb5}
                    type="button"
                    intent="primary"
                    onClick={navigateRoute(navigate, Routes.MARKETPLACE)}
                  >
                    Back To Apps
                  </Button>
                </ButtonGroup>
              )}
            </FlexContainer>
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
